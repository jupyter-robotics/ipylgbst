#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Dr. Thorsten Beier.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""
from IPython.display import display


from ipywidgets import DOMWidget, Output
from traitlets import Unicode, Int, Float, Bool, Complex, Dict
from ._frontend import module_name, module_version

import asyncio

from enum import Enum
from contextlib import contextmanager, redirect_stdout


from io import StringIO
import sys
import math
import traceback


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
    "lane_cmd_index": [0, 0, 0],
}


class AsyncCommandContextManager:
    def __init__(self, lane_proxy):
        self.lane_proxy = lane_proxy
        self.lane = self.lane_proxy.lane
        self.boost = self.lane_proxy.boost
        self._old_index = None

    # enter the async context manager
    async def __aenter__(self):
        self._old_index = int(self.boost._device_info["lane_cmd_index"][self.lane])

    # exit the async context manager
    async def __aexit__(self, exc_type, exc, tb):
        # report a message
        old = self._old_index
        while True:
            await self.lane_proxy._poll()
            # self._log(self._device_info)
            if "lane_cmd_index" not in self.boost._device_info:
                continue
            new = int(self.boost._device_info["lane_cmd_index"][self.lane])
            if new > old:
                break
            elif new < old:
                raise RuntimeError(f"internal error! {old=} {new=}")


class LegoBoostLaneProxy(object):

    def __init__(self, boost, lane):
        self.boost = boost
        self.lane = lane

    async def get_distance_async(self):
        await self._poll()
        d = self.boost._device_info["distance"]
        if d is None:
            d = float("inf")
        if math.isfinite(d) and d > 255.0:
            d = 255.0
        return d

    async def get_roll_async(self):
        """Get the roll angle of the Boost Move Hub."""
        await self._poll()
        return self.boost._device_info["tilt"]["roll"]

    async def get_pitch_async(self):
        """Get the pitch angle of the Boost Move Hub."""
        await self._poll()
        return self.boost._device_info["tilt"]["pitch"]

    async def get_color_async(self):
        """Get the color of the Boost Move Hub."""
        await self._poll()
        return self.boost._device_info["color"]

    async def motor_angle_async(self, port, angle, power):
        """
            Turn a motor for a given angle:

            Args:
                port (Port): The port of the motor.
                angle (float): The angle in degrees.
                power (int): The power of the motor.
            
            Warning: This function needs to be awaited before the next command can be executed.
        """
        if isinstance(port, Port):
            port = port.value
        wait = True
        async with self._async_command_context():
            self._send(
                command="motorAngleAsync",
                await_in_kernel=True,
                await_in_frontend=True,
                args=[str(port), float(angle), int(power), bool(wait)],
            )

    async def motor_angle_multi_async(self, angle, power_a, power_b):
        """
            Turn both motors for a given angle:

            Args:
                angle (float): The angle in degrees.
                power_a (int): The power of motor A.
                power_b (int): The power of motor B.
            
            Warning: This function needs to be awaited before the next command can be executed.
        """
        wait = True
        async with self._async_command_context():
            self._send(
                command="motorAngleMultiAsync",
                await_in_kernel=True,
                await_in_frontend=True,
                args=[float(angle), int(power_a), int(power_b), bool(wait)],
            )

    async def motor_time_async(self, port, seconds, power):
        """
            Turn a motor for a given time:
            
            Args:
                port (Port): The port of the motor.
                seconds (float): The time in seconds.
                power (int): The power of the motor.

            Warning: This function needs to be awaited before the next command can be executed. 
        """
        if isinstance(port, Port):
            port = port.value
        wait = True
        async with self._async_command_context():
            self._send(
                command="motorTimeAsync",
                await_in_kernel=True,
                await_in_frontend=True,
                args=[str(port), float(seconds), int(power), bool(wait)],
            )

    async def motor_time_multi_async(self, seconds, power_a, power_b):
        """
            Turn both motors for a given time:

            Args:
                seconds (float): The time in seconds.
                power_a (int): The power of motor A.
                power_b (int): The power of motor B.
            
            Warning: This function needs to be awaited before the next command can be executed.
        """
        wait = True

        async with self._async_command_context():
            self._send(
                command="motorTimeMultiAsync",
                await_in_kernel=True,
                await_in_frontend=True,
                args=[float(seconds), int(power_a), int(power_b), bool(wait)],
            )

    async def set_led_async(self, color):
        """ Set the color of the LED on the Boost Move Hub.

            Args:
                color (LedColor): The color of the LED.
            
            Warning: This function needs to be awaited before the next command can be executed.
        """
        async with self._async_command_context():
            if isinstance(color, LedColor):
                color = color.value
            self._send(
                command="ledAsync",
                await_in_kernel=True,
                await_in_frontend=True,
                args=[str(color)],
            )

    def motor_time(self, port, seconds, power):
        """ Turn a motor for a given time:

            Args:
                port (Port): The port of the motor.
                seconds (float): The time in seconds.
                power (int): The power of the motor.
            
            Warning: even though this function is not async, it is non-blocking.
        """
        if isinstance(port, Port):
            port = port.value
        self._send(
            command="motorTime",
            await_in_kernel=False,
            await_in_frontend=False,
            args=[str(port), float(seconds), int(power)],
        )

    def motor_angle(self, port, angle, power):
        """ Turn a motor for a given angle:

            Args:
                port (Port): The port of the motor.
                angle (float): The angle in degrees.
                angle (int): The power of the motor.
                power (int): The power of the motor.
            
            Warning: even though this function is not async, it is non-blocking.
        """
        if isinstance(port, Port):
            port = port.value
        self._send(
            command="motorAngle",
            await_in_kernel=False,
            await_in_frontend=False,
            args=[str(port), float(angle), int(power)],
        )

    def motor_time_multi(self, seconds, power_a, power_b):
        """ Turn both motors for a given time:

            Args:
                seconds (float): The time in seconds.
                power_a (int): The power of motor A.
                power_b (int): The power of motor B.

            Warning: even though this function is not async, it is non-blocking.
        """
        self._send(
            command="motorTimeMulti",
            await_in_kernel=False,
            await_in_frontend=False,
            args=[float(seconds), int(power_a), int(power_b)],
        )

    def motor_angle_multi(self, angle, power_a, power_b):
        """ Turn both motors for a given angle:

            Args:
                angle (float): The angle in degrees.
                power_a (int): The power of motor A.
                power_b (int): The power of motor B.
            
            Warning: even though this function is not async, it is non-blocking.
        """
        self._send(
            command="motorAngleMulti",
            await_in_kernel=False,
            await_in_frontend=False,
            args=[float(angle), int(power_a), int(power_b)],
        )

    def set_led(self, color):
        """ Set the color of the LED on the Boost Move Hub.

            Args: 
                color (LedColor): The color of the LED.
            
            Warning: even though this function is not async, it is non-blocking.
        """
        if isinstance(color, LedColor):
            color = color.value
        self._send(
            command="led",
            await_in_kernel=False,
            await_in_frontend=False,
            args=[str(color)],
        )

    async def _connect(self):
        async with self._async_command_context():
            self._send(
                command="connect",
                await_in_kernel=True,
                await_in_frontend=True,
                args=[],
            )

    def _send(self, command, await_in_kernel, await_in_frontend, args):
        data = {}
        data["command"] = str(command)
        data["await_in_kernel"] = bool(await_in_kernel)
        data["await_in_frontend"] = bool(await_in_frontend)
        data["lane"] = self.lane
        data["args"] = args
        self.boost.send(data, [])

    def _async_command_context(self):
        return AsyncCommandContextManager(lane_proxy=self)

    async def _poll(self):
        await wait_for_change(self.boost, "_device_info")


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
    n_lanes =Int(3).tag(sync=True)

    def __init__(self, *args, **kwargs):
        super(LegoBoostWidget, self).__init__(*args, **kwargs)
        
        self._run_lock = asyncio.Lock()
        self._lane_locks = [asyncio.Lock()  for i in range(self.n_lanes)]

    def run_async_program(self, program, lane=0, output=None):

        if lane < 0 or lane >= self.n_lanes :
            raise RuntimeError(f"lane must be >=0 and < {self.n_lanes} but is {lane}")

        if output is None:
            output = Output()
            display(output)
        return asyncio.ensure_future(
            self._run_async_program(lane=lane, program=program, output=output)
        )


    def run_async_programs_concurrently(self, programs, output=None):
        if output is None:
            output = Output()
            display(output)
        np = len(programs)
        if np < 1 or np > self.n_lanes:
            raise RuntimeError(f"the number program must be >=1 and <={self.n_lanes} but is {np}")

        futures = []
        for lane, program in enumerate(programs):
            f = asyncio.ensure_future(
                self._run_async_program(lane=lane, program=program, output=output)
            )
            futures.append(f)
        return futures


    def run_program(self, program, output=None):


        if output is None:
            output = Output()
            display(output)

        lane_proxy = LegoBoostLaneProxy(boost=self, lane=0)
        program(lane_proxy, output)

    def connect(self, output=None):
        async def main(lane, log):
            pass

        self.run_async_program(main, output=output)

    async def _run_async_program(self, lane, program, output):
        def log(*args, **kwargs):
            old_stdout = sys.stdout
            sys.stdout = mystdout = StringIO()

            print(*args, **kwargs)

            sys.stdout = old_stdout

            val = mystdout.getvalue()
            output.append_stdout(f"{val}")

        self._log = log

        async with self._lane_locks[lane]:
            lane_proxy = LegoBoostLaneProxy(boost=self, lane=lane)
            try:
                await lane_proxy._connect()
                await program(lane_proxy, log)
            except Exception as ex:
                err_str = "".join(
                    traceback.TracebackException.from_exception(ex).format()
                )
                output.append_stderr(f"{err_str}\n")
                print("err str", err_str)
