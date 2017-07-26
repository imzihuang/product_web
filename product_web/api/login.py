#coding:utf-8

from tornado.web import RequestHandler
import json
from common.convert import bs2utf8
#from common.log_client import gen_log
from logic import user as loc_user
from common.encrypt_md5 import encry_md5
from common.ini_client import ini_load

com_conf = ini_load('config/commin.ini')
com_dic = com_conf.get_fields("cookie_time")
com_cookie_time = com_dic.get('cookie_time','max_time')

class LoginHandler(RequestHandler):
    def post(self):
        user_name = bs2utf8(self.get_argument('user_name'))
        pwd = bs2utf8(self.get_argument('pwd'))

        user_info = loc_user.get_creating_user(name=user_name)
        if not user_info:
            self.finish(json.dumps({'state': 1, "message": "user name not exit"}))
            return
        if encry_md5(pwd) != user_info.pwd:
            self.finish(json.dumps({'state': 2, "message": "pwd error"}))
            return

        # 设置cookie
        self.set_secure_cookie("user_name", user_info.name, max_age = com_cookie_time)
        self.set_secure_cookie("user_level", str(user_info.level), max_age = com_cookie_time)

        self.finish(json.dumps({'state': 0, 'message': 'ok'}))
