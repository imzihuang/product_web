#!/usr/bin/python
# -*- coding: utf-8 -*-
import tornado
from common.convert import bs2utf8
from common.log_client import gen_log

class ProductHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

    def get_template_path(self):
        return self.templates_path

    def get(self):
        type_id = bs2utf8(self.get_argument('type_id', ""))
        gen_log.info("test-----%s"%type_id)
        self.render('product.html', type_id = type_id)
