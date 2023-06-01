#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Thorsten Beier.
# Distributed under the terms of the Modified BSD License.

"""
Information about the frontend package of the widgets.
"""
from packaging import version
from ._version import __version__  # noqa

v = version.parse(__version__)

module_name = "ipylgbst"
module_version = f"^{v.major}.{v.minor}"
