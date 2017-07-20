#coding:utf-8

from tornado.web import RequestHandler
import json
from common.convert import bs2utf8

class LoginHandler(RequestHandler):
    def post(self):
        user_name = bs2utf8(self.get_argument('user_name'))
        pwd = bs2utf8(self.get_argument('pwd'))

        self.finish(json.dumps({'state': 0}))