#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Dr. Thorsten Beier.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""
from IPython.display import display


from ipywidgets import DOMWidget
from traitlets import Unicode, Dict
from ._frontend import module_name, module_version

import asyncio

from enum import Enum

import math
import uuid
import inspect

def wait_for_change(widget, value):
    """
    Wait for a change in a widget's value.
    """
    future = asyncio.Future()

    def getvalue(change):
        # make the new value available
        future.set_result(change.new)
        widget.unobserve(getvalue, value)

    widget.observe(getvalue, value)
    return future

class Task:
    def __init__(self, widget, task_uuid, task_type):
        self._future = asyncio.Future()
        self._task_uuid = task_uuid
        self._task_type =  task_type
        self._widget = widget

    def __await__(self):
        return self._future.__await__()

    def cancel(self):
        self._widget.send({
            "event": "cancel-task",
            "task_uuid": self._task_uuid,
            "task_type": self._task_type
        })

        self._future.cancel()

    def _set_cancelled(self):
        self._future.cancel()
      
    def _set_result(self):
        if not self._future.done():
            self._future.set_result("finished")

    def done(self):
       return self._future.done()
    
    def cancelled(self):
        return self._future.cancelled()


class LedColor(str, Enum):
    """
    The color of the LED on the Boost Move Hub.
    """

    off = "off"
    pink = "pink"
    purple = "purple"
    blue = "blue"
    lightblue = "lightblue"
    cyan = "cyan"
    green = "green"
    yellow = "yellow"
    orange = "orange"
    red = "red"


class Port(str, Enum):
    """
    The ports on the Boost Move Hub.
    """

    A = "A"
    B = "B"
    AB = "AB"
    C = "C"
    D = "D"


class Sensor(object):
    def __init__(self, name):
        self.name = name

    def value(self, boost):
        if self.name == "distance":
            return boost.get_distance()
        elif self.name == "color":
            return boost.get_color()
        else:
            raise NotImplementedError


DEFAULT_PORT_INFO = {"action": "", "angle": 0}

DEFAULT_DEVICE_INFO = {
    "command_frame": 0,
    "polling_frame": 0,
    "ports": {
        "A": DEFAULT_PORT_INFO,
        "B": DEFAULT_PORT_INFO,
        "AB": DEFAULT_PORT_INFO,
        "C": DEFAULT_PORT_INFO,
        "D": DEFAULT_PORT_INFO,
        "LED": DEFAULT_PORT_INFO,
        "rssi": 0,
        "color": None,
        "connected": False,
    },
    "tilt": {"roll": 0, "pitch": 0},
    "distance": None,

}

class LegoBoostWidget(DOMWidget):
    """Lego Boost Widget"""
    _model_name = Unicode("LegoBoostModel").tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode("LegoBoostView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    _device_info = Dict(DEFAULT_DEVICE_INFO, read_only=True).tag(sync=True)
    name = Unicode("device1").tag(sync=True)

    def __init__(self, *args, **kwargs):
        super(LegoBoostWidget, self).__init__(*args, **kwargs)
        self.on_msg(self._handle_custom_comm_msg)
        self._pending_tasks = {}
    
    def _create_task(self, task_type, data):
        task_uuid = str(uuid.uuid4())
        task_type = task_type
        task = Task(widget = self,task_uuid=task_uuid, task_type=task_type)
        self._pending_tasks[task_uuid] = task
                              
        self.send({
            "event": "start-task",
            "task_uuid": task_uuid,
            "task_type": task_type,
            "data": data
        })
        return task
        
    # Method that handles with the different comm messages received from the frontend
    def _handle_custom_comm_msg(self, _,  content, buffers):
        event = content.get("event")
        task_uuid = content.get("task_uuid")
        task_type = content.get("task_type")
        task = self._pending_tasks.get(task_uuid)
        
        if task is not None and not task.done():
            if event == "task-finished":
                task._set_result()
                print(f"Task {task_type} finished")
                
            if event == "task-cancelled":
                task._set_cancelled()
                print(f"Task {task_type} cancelled")

            del self._pending_tasks[task_uuid]
    
    def connect(self):
        return self._create_task(task_type="connect", data={})
    
    def disconnect(self):
        return self._create_task(task_type="disconnect", data={}) 

    async def _poll(self):
        await wait_for_change(self, "_device_info")

    async def get_distance_async(self):
        await self._poll()
        d = self._device_info["distance"]
        if d is None:
            d = float("inf")
        if math.isfinite(d) and d > 255.0:
            d = 255.0
        return d

    async def get_roll_async(self):
        """Get the roll angle of the Boost Move Hub."""
        await self._poll()
        return self._device_info["tilt"]["roll"]

    async def get_pitch_async(self):
        """Get the pitch angle of the Boost Move Hub."""
        await self._poll()
        return self._device_info["tilt"]["pitch"]

    async def get_color_async(self):
        """Get the color of the Boost Move Hub."""
        await self._poll()
        return self._device_info["color"]

    def motor_angle(self, port, angle, power):
        """
            Turn a motor for a given angle:

            Args:
                port (Port): The port of the motor.
                angle (float): The angle in degrees.
                power (int): The power of the motor.

        """
        if isinstance(port, Port):
            port = port.value
        wait = True
        return self._create_task(task_type="motor-angle", data={"port": port, "angle": angle, "power": power, "wait": wait})

    def motor_angle_multi(self, angle, power_a, power_b):
        """
            Turn both motors for a given angle:

            Args:
                angle (float): The angle in degrees.
                power_a (int): The power of motor A.
                power_b (int): The power of motor B.
            
        """
        wait = True
        return self._create_task(task_type="motor-angle-multi", data= {"angle": angle, "power_a": power_a, "power_b": power_b, "wait": wait})

    def motor_time(self, port, seconds, power):
        """
            Turn a motor for a given time:
            
            Args:
                port (Port): The port of the motor.
                seconds (float): The time in seconds.
                power (int): The power of the motor.

        """
        if isinstance(port, Port):
            port = port.value
        wait = True
       
        return self._create_task(task_type="motor-time", data={"port": port, "seconds": seconds, "power": power, "wait": wait})

    def motor_time_multi(self, seconds, power_a, power_b):
        """
            Turn both motors for a given time:

            Args:
                seconds (float): The time in seconds.
                power_a (int): The power of motor A.
                power_b (int): The power of motor B.
            
        """
        wait = True
        
        return self._create_task(task_type="motor-time-multi", data={"seconds": seconds, "power_a": power_a, "power_b": power_b, "wait": wait})
        

    def set_led(self, color):
        """ Set the color of the LED on the Boost Move Hub.

            Args:
                color (LedColor): The color of the LED.
            
        """
     
        if isinstance(color, LedColor):
                color = color.value
                
        return self._create_task(task_type="set-led", data={"color": color})