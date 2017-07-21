#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado
from common.log_client import gen_log

class DefaultHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, product_prefix, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

        if product_prefix[-1] != '/':
            product_prefix += '/'
        self.prefix = product_prefix

    def get_template_path(self):
        return self.templates_path

    def get(self):
        self.redirect(self.prefix + r'home.html', permanent=True)

class HomeHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

    def get_template_path(self):
        return self.templates_path

    def get(self):
        forwarded = self.request.headers.get("x-forwarded-for", "")
        real_iP =self.request.headers.get("x-real-ip", "")
        gen_log.info("home:%s,%s"%(forwarded, real_iP))

        self.render('home.html')