#!/usr/bin/python
# -*- coding: utf-8 -*-

import tornado.ioloop
from tornado.web import URLSpec, StaticFileHandler

#from product_web import views
#from product_web import api
import views
import api
from settings import *


def view_handlers():
    prefix = default_settings.get('product_prefix', '/product')
    if prefix[-1] != '/':
        prefix += '/'
    return [
        URLSpec('/', views.DefaultHandler, default_settings),
        URLSpec(prefix + r'home.html$', views.HomeHandler, default_settings),
        URLSpec(prefix + r'product.html$', views.ProductHandler, default_settings),
        URLSpec(prefix + r'login.html$', views.LoginHandler, default_settings),
        URLSpec(prefix + r'signin.html$', views.SignInHandler, default_settings),
        URLSpec(prefix + r'findpwd.html$', views.FindPwdHandler, default_settings),
        URLSpec(prefix + r'helpbuy.html$', views.HelpBuyHandler, default_settings),
        URLSpec(prefix + r'getmoney.html$', views.GetMoneyHandler, default_settings),
        (prefix + r'(.*\.(css|png|gif|js))', StaticFileHandler, {'path': default_settings.get('static_path')}),
    ]

def api_handlers():
    prefix = default_settings.get('product_prefix', '/product')
    if prefix[-1] != '/':
        prefix += '/'
    return [
        (prefix + r'login$', api.LoginHandler),
        (prefix + r'signin$', api.SignInHandler),
    ]

class My_Application(tornado.web.Application):
    def __init__(self, handlers=None, default_host="", **settings):
        super(My_Application, self).__init__(view_handlers() + api_handlers() + handlers, default_host, **settings)

def make_app():
    return My_Application([])


if __name__ == "__main__":
    app = make_app()
    app.listen(8081)
    print "start web"
    tornado.ioloop.IOLoop.current().start()
