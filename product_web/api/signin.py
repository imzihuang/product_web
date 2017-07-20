#coding:utf-8

from tornado.web import RequestHandler
import json
from common.convert import bs2utf8

class SignInHandler(RequestHandler):
    def post(self):
        user_name = bs2utf8(self.get_argument('user_name'))
        email = bs2utf8(self.get_argument('email'))
        pwd = bs2utf8(self.get_argument('pwd'))
        affirm_pwd = bs2utf8(self.get_argument('affirm_pwd'))

        self.finish(json.dumps({'state': 0}))