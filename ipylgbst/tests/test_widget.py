#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Thorsten Beier.
# Distributed under the terms of the Modified BSD License.

import pytest

from .. import LegoBoostWidget,LedColor,Port, Sensor



def test_example_creation_blank():
    w = LegoBoostWidget()