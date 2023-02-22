#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Dr. Thorsten Beier.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""
from IPython.display import display


from ipywidgets import DOMWidget,Output
from traitlets import Unicode,Int,Float,Bool,Complex,Dict
from ._frontend import module_name, module_version

import asyncio

from enum import Enum
from contextlib import contextmanager, redirect_stdout



from io import StringIO
import sys



# examine mystdout.getvalue()


def wait_for_change(widget, value):
    future = asyncio.Future()
    def getvalue(change):
        # make the new value available
        future.set_result(change.new)
        widget.unobserve(getvalue, value)
    widget.observe(getvalue, value)
    return future




    
    
    
    
    
    
    
    
    
    



class LedColor(str,Enum):
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


class Port(str,Enum):
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


DEFAULT_PORT_INFO = {'action':'','angle':0}

DEFAULT_DEVICE_INFO = {
    'command_frame':0,
    'polling_frame':0,
    'ports':{
        "A":DEFAULT_PORT_INFO,
        "B":DEFAULT_PORT_INFO,
        "AB":DEFAULT_PORT_INFO,
        "C":DEFAULT_PORT_INFO,
        "D":DEFAULT_PORT_INFO,
        "LED":DEFAULT_PORT_INFO,
        "rssi":0,
        "color":None,
        "connected":False
    },
    'tilt':{
        'roll':0,
        'pitch':0
    },
    'distance': None
}


class LegoBoostWidget(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('LegoBoostModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('LegoBoostView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    
    _device_info = Dict(DEFAULT_DEVICE_INFO, read_only=True).tag( sync=True)

    def __init__(self, *args, **kwargs):
        super(LegoBoostWidget, self).__init__(*args, **kwargs)


    def run(self, amain, out=None):
        if out is None:
            out = Output()
            display(out)
        return asyncio.ensure_future(self._run_async(amain=amain, out=out))

    def connect(self, out=None):
        async def main(log):  
            pass
        self.run(main, out=out);


    async def _run_async(self, amain, out):
        def log(*args, **kwargs):

            old_stdout = sys.stdout
            sys.stdout = mystdout = StringIO()

            print(*args,**kwargs)

            sys.stdout = old_stdout

            val = mystdout.getvalue()
            out.append_stdout(f"{val}")

        try:
            await self._connect()
            await amain(log)
        except Exception as e:
            out.append_stderr(f"{e}")




    async def _next_command_frame(self):
        old = int(self._device_info['command_frame'])
        while True:
            await self.poll()
            new  = int(self._device_info['command_frame'])
            if new > old:
                break
            elif new < old:
                raise RuntimeError(f"internal error! {old=} {new=}")

    async def poll(self):
        await wait_for_change(self, '_device_info')

    async def get_distance(self):
        d = self._device_info['distance']
        if d is None:
            d = float('inf')
        return d

    async def get_roll(self):
        await self.poll()
        return self._device_info['tilt']['roll']

    async def get_pitch(self):
        await self.poll()
        return self._device_info['tilt']['pitch']

    async def get_color(self):
        await self.poll()
        return self._device_info['color']


    async def motor_angle(self, port, angle, power, wait=True):
        args = [str(port), float(angle),int(power),bool(wait)]
        self.send({"command":"motorAngleAsync", "args":args},[])
        await self._next_command_frame()

    async def motor_angle_multi(self, angle, power_a, power_b,wait=True):
        args = [float(angle),int(power_a),int(power_b),bool(wait)]
        self.send({"command":"motorAngleMultiAsync", "args":args},[])
        await self._next_command_frame()

    async def motor_time(self, port, seconds, power, wait=True):
        args = [str(port), float(seconds),int(power),bool(wait)]
        self.send({"command":"motorTimeAsync", "args":args},[])
        await self._next_command_frame()

    async def motor_time_multi(self, seconds, power_a, power_b,wait=True):
        args = [float(seconds),int(power_a),int(power_b),bool(wait)]
        self.send({"command":"motorTimeMultiAsync", "args":args},[])
        await self._next_command_frame()


    async def set_led(self, color):
        if isinstance(color, LedColor):
            color = color.value
        self.send({"command":"ledAsync", "args":[color]},[])
        await self._next_command_frame()


    async def _connect(self):
        self.send({"command":"connect"},[])
        await self._next_command_frame()

    async def disconnect(self):
        self._disconnect()
        await self._next_command_frame()












