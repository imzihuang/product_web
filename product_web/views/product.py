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
        real_ip = self.request.headers.get("x-real-ip", self.request.headers.get("x-forwarded-for", ""))
        record_pv_pu(real_ip, "product.html")

        keyword = bs2utf8(self.get_argument('keyword', ""))
        user_name = self.get_secure_cookie('user_name', '')
        self.render('product.html', keyword=keyword, user_name=user_name)
