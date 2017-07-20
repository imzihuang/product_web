#!/usr/bin/python
# -*- coding: utf-8 -*-
import tornado
from common.convert import bs2utf8

class ProductHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

    def get_template_path(self):
        return self.templates_path

    def get(self):
        type_id = bs2utf8(self.get_argument('type_id', ""))
        self.render('product.html', type_id = type_id)
