#!/usr/bin/python
# -*- coding: utf-8 -*-

import unittest
import datetime
from logic import pvpu

class SqlTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def test_add(self):
        _ = pvpu.pv_add("ip", "html")
        _ = pvpu.pu_add("ip", "html")
        self.assertTrue(_ > 0)

    def test_get(self):
        current_month = datetime.datetime.now().strftime('%Y-%m')+"-00 00:00:00"
        current_date = datetime.datetime.now().strftime('%Y-%m-%d')+ " 00:00:00"
        #_ = pvpu.get_pu("ip", "html", current_month)
        _ = pvpu.get_pv("ip", "html")
        print _



if __name__ == '__main__':
    unittest.main()
