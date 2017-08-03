#!/usr/bin/python
# -*- coding: utf-8 -*-
import tornado
from base import entry_id_data_args

class KeywordHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

    def get_template_path(self):
        return self.templates_path

    @entry_id_data_args
    def get(self):
        self.render('mankeyword.html')

class ProductHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

    def get_template_path(self):
        return self.templates_path

    @entry_id_data_args
    def get(self):
        self.render('manproduct.html')

class BaseInfoHandler(tornado.web.RequestHandler):
    def initialize(self, static_path, templates_path, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

    def get_template_path(self):
        return self.templates_path

    @entry_id_data_args
    def get(self):
        self.render('manbase.html')
