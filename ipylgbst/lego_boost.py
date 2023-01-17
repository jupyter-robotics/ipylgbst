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


def wait_for_change(widget, value):
    future = asyncio.Future()
    def getvalue(change):
        # print("get value",change.new,change.old)
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

DEFAULT_PORT_INFO = {'action':'','angle':0}

DEFAULT_DEVICE_INFO = {
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

    polling_frame = Int(0,read_only=True).tag( sync=True)
    command_frame = Int(0,read_only=True).tag( sync=True)
    
    device_info = Dict(DEFAULT_DEVICE_INFO, read_only=True).tag( sync=True)



    def __init__(self, *args, **kwargs):
        super(LegoBoostWidget, self).__init__(*args, **kwargs)


    async def run_async(self, amain, out=None):
        if out is None:
            out = Output()
            
            display(out)
        
        out.write = out.append_stdout
        # with redirect_stdout(out):
        try:
            await amain(self, out)
        except Exception as e:
            out.append_stdout(f"exception happend {str(e)}\n")
            print("exception happend", e)


    def run(self, amain, out=None):
        if out is None:
            out = Output()
            out.write = out.append_stdout
            display(out)


        return asyncio.ensure_future(self.run_async(amain=amain, out=out))


    async def _next_command_frame(self):
        await wait_for_change(self, 'command_frame')


    def _disconnect(self):
        self.send({"command":"disconnect"},[])


    async def poll(self):
        #self.send({"command":"poll", "args":[]},[])
        #await wait_for_change(self, 'command_frame')
        await wait_for_change(self, 'polling_frame')

    async def get_device_info(self, poll=True):
        if poll:
            await self.poll()
        return self.device_info

    async def get_distance(self, poll=True):
        d = (await self.get_device_info(poll=poll)).get('distance',None)
        if d is None:
            d = float('Infinity')
        return d

    async def get_roll(self,poll=True):
        return (await self.get_device_info(poll=poll))['tilt']['roll']

    async def get_pitch(self,poll=True):
        return (await self.get_device_info(poll=poll))['tilt']['pitch']

    async def get_angle(self, port, poll=True):
        return (await self.get_device_info(poll=poll))["ports"][str(port)]['angle']

    async def get_action(self, port,poll=True):
        return (await self.get_device_info(poll=poll))["ports"][str(port)]['action']



    async def connect(self):
        self.send({"command":"connect"},[])
        await self._next_command_frame()

    async def disconnect(self):
        self._disconnect()
        await self._next_command_frame()

    async def drive(self, distance, wait=False):
        args = [int(distance), bool(wait)]
        self.send({"command":"drive", "args":args},[])
        await self._next_command_frame()

    async def turn(self, degrees, wait=False):
        args = [float(degrees), bool(wait)]
        self.send({"command":"turn", "args":args},[])
        await self._next_command_frame()

    async def driveUntil(self, distance=0, wait=False):
        args = [float(distance), bool(wait)]
        self.send({"command":"driveUntil", "args":args},[])
        await self._next_command_frame()

    async def turnUntil(self, direction=1, wait=False):
        args = [float(direction), bool(wait)]
        self.send({"command":"turnUntil", "args":args},[])
        await self._next_command_frame()


    async def ledAsync(self, color):
        self.send({"command":"ledAsync", "args":[str(color)]},[])
        await self._next_command_frame()




    async def motorTime(self, port, seconds, duty_cycle=100):
        args = [str(port), float(seconds),int(duty_cycle)]
        self.send({"command":"motorTime", "args":args},[])
        await self._next_command_frame()

    async def motorTimeMulti(self, seconds, duty_cycle_a=100, duty_cycle_b=100):
        args = [float(seconds),int(duty_cycle_a), int(duty_cycle_b)]
        self.send({"command":"motorTimeMulti", "args":args},[])
        await self._next_command_frame()

    async def motorTimeAsync(self, port, seconds, duty_cycle=100, wait=False):
        args = [str(port), float(seconds),int(duty_cycle),bool(wait)]
        self.send({"command":"motorTimeAsync", "args":args},[])
        await self._next_command_frame()

    async def motorTimeMultiAsync(self, seconds, duty_cycle_a=100, duty_cycle_b=100,wait=False):
        args = [float(seconds),int(duty_cycle_a),int(duty_cycle_b),bool(wait)]
        self.send({"command":"motorTimeMultiAsync", "args":args},[])
        await self._next_command_frame()

    
    async def motorAngle(self, port, angle, duty_cycle=100): 
        args = [str(port), float(angle),int(duty_cycle)]
        self.send({"command":"motorAngle", "args":args},[])
        await self._next_command_frame()

    async def motorAngleMulti(self, angle, duty_cycle_a=100, duty_cycle_b=100):
        args = [float(angle),int(duty_cycle_a),int(duty_cycle_b)]
        self.send({"command":"motorAngleMulti", "args":args},[])
        await self._next_command_frame()


    async def motorAngleAsync(self, port, angle, duty_cycle=100, wait=False):
        args = [str(port), float(angle),int(duty_cycle),bool(wait)]
        self.send({"command":"motorAngleAsync", "args":args},[])
        await self._next_command_frame()


    async def motorAngleMultiAsync(self, angle, duty_cycle_a=100, duty_cycle_b=100,wait=False):
        args = [float(angle),int(duty_cycle_a),int(duty_cycle_b),bool(wait)]
        self.send({"command":"motorAngleMultiAsync", "args":args},[])
        await self._next_command_frame()














