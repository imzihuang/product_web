#coding:utf-8

from tornado.web import RequestHandler
import json
from random import randint
from common.convert import bs2utf8, is_email
from product_web.logic import user as loc_user
from product_web.email.email import send_email

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

        if is_email(email):
            self.finish(json.dumps({'state': 2, "message": "Email format error"}))
            return
        # 根据邮箱获取账号，判断账号是否已经注册
        if loc_user.is_exit_avai_email(email):
            self.finish(json.dumps({'state': 3, "message": "Email address already exists"}))
            return
        # 生成验证码，并发送邮件
        val_code = ''.join((str(randint(0, 9)) for _ in xrange(6)))
        loc_user.add_user({
            "name": user_name,
            "email": email,
            "pwd": pwd,
            "valcode": val_code
        })
        #send_email(email, )



        self.finish(json.dumps({'state': 0}))

class SignInRegCode(RequestHandler):
    def get(self):
        """
        验证路径
        :return:
        """
        val_code = bs2utf8(self.get_argument("val_code"))
        redirect_url = bs2utf8(self.get_argument("redirect_url"))
        if not redirect_url:
            redirect_url = "home.html"

        #判断验证码

        #更新用户状态

        #跳转
        self.redirect(self.prefix + redirect_url, permanent=True)
