#!/usr/bin/python
# -*- coding: utf-8 -*-

from tornado import httpserver
from tornado.web import URLSpec, StaticFileHandler, Application
from tornado.options import define, options
from tornado.ioloop import IOLoop
from setproctitle import setproctitle
import views
import api
from settings import *


def view_handlers():
    prefix = default_settings.get('product_prefix', '/product')
    if prefix[-1] != '/':
        prefix += '/'

    man_prefix = default_settings.get('manage_prefix', '/manage')
    if man_prefix[-1] != '/':
        man_prefix += '/'
    return [
        URLSpec('/', views.DefaultHandler, default_settings),
        URLSpec(prefix + r'home.html$', views.HomeHandler, default_settings),
        URLSpec(prefix + r'product.html$', views.ProductHandler, default_settings),
        URLSpec(prefix + r'login.html$', views.LoginHandler, default_settings),
        URLSpec(prefix + r'signin.html$', views.SignInHandler, default_settings),
        URLSpec(prefix + r'signin_notice.html$', views.SignInNoticeHandler, default_settings),
        URLSpec(prefix + r'findpwd.html$', views.FindPwdHandler, default_settings),
        URLSpec(prefix + r'helpbuy.html$', views.HelpBuyHandler, default_settings),
        URLSpec(prefix + r'getmoney.html$', views.GetMoneyHandler, default_settings),
        (prefix + r'(.*\.(css|png|gif|js))', StaticFileHandler, {'path': default_settings.get('static_path')}),
        URLSpec(man_prefix + r'mankeyword.html$', views.ManKeywordHandler, default_settings),
        URLSpec(man_prefix + r'manproduct.html$', views.ManProductHandler, default_settings),
        URLSpec(man_prefix + r'manbaseinfo.html$', views.ManBaseInfoHandler, default_settings),
        (man_prefix + r'(.*\.(css|png|gif|js))', StaticFileHandler, {'path': default_settings.get('static_path')}),
    ]

def api_handlers():
    prefix = default_settings.get('product_prefix', '/product')
    if prefix[-1] != '/':
        prefix += '/'
    return [
        (prefix + r'login$', api.LoginHandler),
        (prefix + r'logout', api.LogoutHandler),
        (prefix + r'signin$', api.SignInHandler),
        (prefix + r'regcode_signin$', api.SignInRegCodeHandler, default_settings),
        (prefix + r'product_os$', api.ProductHandler),
        (prefix + r'keyword_os$', api.KeywordHandler)
    ]

class My_Application(Application):
    def __init__(self, handlers=None, default_host="", **settings):
        super(My_Application, self).__init__(view_handlers() + api_handlers() + handlers, default_host, **settings)

def make_app():
    settings = {
        'cookie_secret': "bZJc2sWbQLKos6GkHn/VB9oXwQt8S0R0kRvJ5/xJ89E=",
    }
    return My_Application([], **settings)

define("port", default=8081, help="run on the given port", type=int)
setproctitle('product:web')

if __name__ == "__main__":
    options.logging = 'info'
    app = make_app()
    server = httpserver.HTTPServer(app, xheaders=True)
    server.bind(options.port)
    server.start(0)
    IOLoop.instance().start()

    #app.listen(options.port)
    #tornado.ioloop.IOLoop.current().start()
