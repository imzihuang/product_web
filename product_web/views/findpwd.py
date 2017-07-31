#!/usr/bin/python
# -*- coding: utf-8 -*-
import tornado

class FindPwdHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

    def get_template_path(self):
        return self.templates_path

    def get(self):
        real_ip = self.request.headers.get("x-real-ip", self.request.headers.get("x-forwarded-for", ""))
        record_pv_pu(real_ip, "findpwd.html")

        self.render('findpwd.html')
