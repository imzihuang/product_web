#coding:utf-8

from tornado.web import RequestHandler
import json
from random import randint
from common.convert import bs2utf8, is_email
from common.encrypt_md5 import get_md5
from logic import user as loc_user
from ser_email.ser_email import send_email
from common.log_client import gen_log

class SignInHandler(RequestHandler):
    def post(self):
        user_name = bs2utf8(self.get_argument('user_name', ''))
        email = bs2utf8(self.get_argument('email', ''))
        # telephone = bs2utf8(self.get_argument('telephone', ''))
        pwd = bs2utf8(self.get_argument('pwd', ''))
        affirm_pwd = bs2utf8(self.get_argument('affirm_pwd', ''))
        real_ip =self.request.headers.get("x-real-ip", self.request.headers.get("x-forwarded-for", ""))

        if pwd != affirm_pwd:
            self.finish(json.dumps({'state': 1, "message": "The two passwords don't match"}))
            return

        if not is_email(email):
            self.finish(json.dumps({'state': 2, "message": "Email format error"}))
            return
        # 根据邮箱获取账号，判断账号是否已经注册
        if loc_user.is_exit_avai_email(email):
            self.finish(json.dumps({'state': 3, "message": "Email address already exists"}))
            return
        # 生成验证码，并发送邮件
        creating_user = loc_user.get_creating_user(email=email)
        msg = ""
        if creating_user:
            val_code=creating_user.valcode
            msg = "Email Address already registered, ValCode:%s"%val_code
        else:
            val_code = ''.join((str(randint(0, 9)) for _ in xrange(6)))
            loc_user.add_user({
                "name": user_name,
                "email": email,
                "pwd": get_md5(pwd),
                "valcode": val_code,
                "status": "creating"
            })
            msg = "ValCode:%s"%val_code
        #send_email(email, )



        self.finish(json.dumps({'state': 0, "message": msg}))

class SignInRegCode(RequestHandler):
    def initialize(self, static_path, templates_path, product_prefix, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

        if product_prefix[-1] != '/':
            product_prefix += '/'
        self.prefix = product_prefix
         
    def get(self):
        """
        验证路径
        :return:
        """
        user_name = bs2utf8(self.get_argument('user_name', ''))
        val_code = bs2utf8(self.get_argument("val_code", ""))
        redirect_url = bs2utf8(self.get_argument("redirect_url", ""))
        gen_log.error("test%s,%s"%(user_name, val_code))
        if not redirect_url:
            redirect_url = "home.html"

        user_info = loc_user.get_creating_user(name=user_name)
        if not user_info:
            gen_log.error("user info is none")
            redirect_url = "login.html"
            self.redirect(self.prefix + redirect_url, permanent=True)
            return

        #判断验证码
        if user_info.valcode != val_code:
            gen_log.error("val code:%s,%s"%(user_info.valcode, val_code))
            redirect_url = "login.html"
            self.redirect(self.prefix + redirect_url, permanent=True)
            return

        #更新用户状态
        loc_user.update_user({"status": "available"}, {"name": [user_name]})
        gen_log.error("test%s,%s"%(user_name, val_code))

        #跳转
        self.redirect(self.prefix + redirect_url, permanent=True)
