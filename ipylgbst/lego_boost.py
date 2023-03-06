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


# examine mystdout.getvalue()


def wait_for_change(widget, value):
    future = asyncio.Future()

    def getvalue(change):
        # make the new value available
        future.set_result(change.new)
        widget.unobserve(getvalue, value)

    widget.observe(getvalue, value)
    return future


class LedColor(str, Enum):
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


class LegoBoostLaneProxy(object):
    def __init__(self, boost, lane):
        self.boost = boost
        self.lane = lane

    async def get_distance(self):
        return await self.boost._get_distance()

    async def get_roll(self):
        return await self.boost._get_roll()

    async def get_pitch(self):
        return await self.boost._get_pitch()

    async def get_color(self):
        return await self.boost._get_color()

    async def motor_angle(self, port, angle, power, wait=True):
        return await self.boost._motor_angle(
            lane=self.lane, port=port, angle=angle, power=power, wait=wait
        )

    async def motor_angle_multi(self, angle, power_a, power_b, wait=True):
        return await self.boost._motor_angle_multi(
            lane=self.lane, angle=angle, power_a=power_a, power_b=power_b, wait=wait
        )

    async def motor_time(self, port, seconds, power, wait=True):
        return await self.boost._motor_time(
            lane=self.lane, port=port, seconds=seconds, power=power, wait=wait
        )

    async def motor_time_multi(self, seconds, power_a, power_b, wait=True):
        return await self.boost._motor_time_multi(
            lane=self.lane, seconds=seconds, power_a=power_a, power_b=power_b, wait=wait
        )

    async def set_led(self, color):
        return await self.boost._set_led(lane=self.lane, color=color)


class LegoBoostWidget(DOMWidget):
    """TODO: Add docstring here"""

    _model_name = Unicode("LegoBoostModel").tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode("LegoBoostView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    _device_info = Dict(DEFAULT_DEVICE_INFO, read_only=True).tag(sync=True)

    def __init__(self, *args, **kwargs):
        super(LegoBoostWidget, self).__init__(*args, **kwargs)

        self._run_lock = asyncio.Lock()

        self._lane_locks = [asyncio.Lock(), asyncio.Lock(), asyncio.Lock()]

    def run(self, program, out=None):
        return self.run_concurrent(programs=[program], out=out)

    def run_concurrent(self, programs, out=None):
        if out is None:
            out = Output()
            display(out)
        np = len(programs)
        if np < 1 or np > 3:
            raise RuntimeError(f"the number program must be >=1 and <=3 but is {np}")

        futures = []
        for lane, program in enumerate(programs):
            f = asyncio.ensure_future(
                self._run_program(lane=lane, program=program, out=out)
            )
            futures.append(f)
        return futures

    def connect(self, out=None):
        async def main(lane, log):
            pass

        self.run(main, out=out)

    async def _run_program(self, lane, program, out):
        def log(*args, **kwargs):
            old_stdout = sys.stdout
            sys.stdout = mystdout = StringIO()

            print(*args, **kwargs)

            sys.stdout = old_stdout

            val = mystdout.getvalue()
            out.append_stdout(f"{val}")

        self._log = log

        async with self._lane_locks[lane]:
            lane_proxy = LegoBoostLaneProxy(boost=self, lane=lane)
            try:
                await self._connect(lane=lane)
                await program(lane_proxy, log)
            except Exception as e:
                out.append_stderr(f"{e}")

    async def _next_lane_cmd(self, lane):
        old = int(self._device_info["lane_cmd_index"][lane])
        while True:
            await self._poll()
            # self._log(self._device_info)
            if "lane_cmd_index" not in self._device_info:
                continue
            new = int(self._device_info["lane_cmd_index"][lane])
            if new > old:
                break
            elif new < old:
                raise RuntimeError(f"internal error! {old=} {new=}")

    async def _poll(self):
        await wait_for_change(self, "_device_info")

    async def _get_distance(self):
        d = self._device_info["distance"]
        if d is None:
            d = float("inf")
        if math.isfinite(d) and d > 255.0:
            d = 255.0
        return d

    async def _get_roll(self):
        await self._poll()
        return self._device_info["tilt"]["roll"]

    async def _get_pitch(self):
        await self._poll()
        return self._device_info["tilt"]["pitch"]

    async def _get_color(self):
        await self._poll()
        return self._device_info["color"]

    async def _motor_angle(self, lane, port, angle, power, wait=True):
        args = [str(port), float(angle), int(power), bool(wait)]
        self.send({"command": "motorAngleAsync", "lane": lane, "args": args}, [])
        await self._next_lane_cmd(lane=lane)

    async def _motor_angle_multi(self, lane, angle, power_a, power_b, wait=True):
        args = [float(angle), int(power_a), int(power_b), bool(wait)]
        self.send({"command": "motorAngleMultiAsync", "lane": lane, "args": args}, [])
        await self._next_lane_cmd(lane=lane)

    async def _motor_time(self, lane, port, seconds, power, wait=True):
        args = [str(port), float(seconds), int(power), bool(wait)]
        self.send({"command": "motorTimeAsync", "lane": lane, "args": args}, [])
        await self._next_lane_cmd(lane=lane)

    async def _motor_time_multi(self, lane, seconds, power_a, power_b, wait=True):
        args = [float(seconds), int(power_a), int(power_b), bool(wait)]
        self.send({"command": "motorTimeMultiAsync", "lane": lane, "args": args}, [])
        await self._next_lane_cmd(lane=lane)

    async def _set_led(self, lane, color):
        if isinstance(color, LedColor):
            color = color.value
        self.send({"command": "ledAsync", "lane": lane, "args": [color]}, [])
        await self._next_lane_cmd(lane=lane)

    async def _connect(self, lane):
        self.send({"command": "connect", "lane": lane}, [])
        await self._next_lane_cmd(lane=lane)
