#!/usr/bin/python
# -*- coding: UTF-8 -*-

from Crypto.Hash import MD5

def get_md5(v):
    return MD5.new(v).hexdigest()