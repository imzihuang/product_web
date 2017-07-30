#coding:utf-8

from tornado.web import RequestHandler
import json
from random import randint
from common.convert import is_email, is_user_name
from common.log_client import gen_log
from logic import user as loc_user
from common.encrypt_md5 import encry_md5
from common.ini_client import ini_load
from ser_email.ser_email import send_email

ser_conf = ini_load('config/service.ini')
ser_dic_con = ser_conf.get_fields('service')
ser_url = ser_dic_con.get("url")
ser_port = ser_dic_con.get("port")

com_conf = ini_load('config/commin.ini')
com_dic = com_conf.get_fields("cookie_time")
com_cookie_time = com_dic.get('cookie_time', 'max_time')

class LoginHandler(RequestHandler):
    def post(self):
        user_name = self.get_argument('user_name')
        pwd = self.get_argument('pwd')

        user_info = loc_user.get_available_user(name=user_name)
        if not user_info:
            self.finish(json.dumps({'state': 1, "message": "user name not exit"}))
            return
        if encry_md5(pwd) != user_info.pwd:
            self.finish(json.dumps({'state': 2, "message": "pwd error"}))
            return

        # 设置cookie
        self.set_secure_cookie("user_name", user_info.name, max_age = com_cookie_time)
        self.set_secure_cookie("user_level", str(user_info.level), max_age = com_cookie_time)

        self.finish(json.dumps({'state': 0, 'message': 'ok', "level": user_info.level}))

class LogoutHandler(RequestHandler):
    def post(self):
        try:
            self.clear_cookie("user_name")
            self.clear_cookie("user_level")
            self.finish(json.dumps({'state': 0, 'message': 'logout ok'}))
        except Exception,ex:
            self.finish(json.dumps({'state': 1, 'message': 'logout faild'}))

class SignInHandler(RequestHandler):
    def post(self):
        user_name = self.get_argument('user_name', '')
        if not is_user_name(user_name):
            self.finish(json.dumps({'state': 6, "message": "User name format error"}))
            return
        email = self.get_argument('email', '')
        # telephone = bs2utf8(self.get_argument('telephone', ''))
        pwd = self.get_argument('pwd', '')
        affirm_pwd = self.get_argument('affirm_pwd', '')
        real_ip =self.request.headers.get("x-real-ip", self.request.headers.get("x-forwarded-for", ""))

        if not pwd or pwd != affirm_pwd:
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
            try:
                loc_user.add_user({
                    "name": user_name,
                    "email": email,
                    "pwd": encry_md5(pwd),
                    "valcode": val_code,
                    "status": "creating"
                })
            except Exception as e:
                self.finish(json.dumps({'state': 4, "message": str(e)}))
                return
            msg = "ValCode:%s"%val_code
        #http://123.58.0.76:48080/product/regcode_signin?user_name=123errr&val_code=403164
        #"I'm %(name)s. I'm %(age)d year old" % {'name':'Vamei', 'age':99}
        redirect_url = "http://%(ip)s:%(port)s/product/regcode_signin?user_name=%(name)s&val_code=%(val_code)s"%{
            "ip": ser_url,
            "port": ser_port,
            "name": user_name,
            "val_code": val_code
        }
        html = """
            <html>
              <head></head>
              <body>
                <p>Hi!<br>
                   <a href="%(redirect_url)s">Please verify email. </a>
                </p>
              </body>
            </html>
            """
        if not send_email(email, html%{"redirect_url":redirect_url}, "Verify email"):
            self.finish(json.dumps({'state': 5, "message": "send email faild"}))
            return
        self.finish(json.dumps({'state': 0, "message": msg}))

class SignInRegCodeHandler(RequestHandler):
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
        user_name = self.get_argument('user_name', '')
        val_code = self.get_argument("val_code", "")
        redirect_url = self.get_argument("redirect_url", "")
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

        # 设置cookie，注册的，默认都是1
        self.set_secure_cookie("user_name", user_name, max_age = com_cookie_time)
        self.set_secure_cookie("user_level", "1", max_age = com_cookie_time)

        #跳转
        self.redirect(self.prefix + redirect_url, permanent=True)

class ReSetUserPwdHandler(RequestHandler):
    def initialize(self, static_path, templates_path, product_prefix, **kwds):
        self.static_path = static_path
        self.templates_path = templates_path

        if product_prefix[-1] != '/':
            product_prefix += '/'
        self.prefix = product_prefix

    def post(self):
        user_name = self.get_argument('user_name', '')
        email = self.get_argument('email', '')
        new_pwd = self.get_argument('new_pwd', '')
        affirm_pwd = self.get_argument('affirm_pwd', '')
        if not new_pwd or new_pwd != affirm_pwd:
            self.finish(json.dumps({'state': 1, "message": "The two passwords don't match"}))

        if not is_email(email):
            self.finish(json.dumps({'state': 1, "message": "Email format error"}))
            return

        user_info = loc_user.get_available_user(name=user_name)
        if user_info.email != email:
            self.finish(json.dumps({'state': 2, "message": "The user name and email don't match"}))
            return
        # 生成验证码
        val_code = ''.join((str(randint(0, 9)) for _ in xrange(6)))
        redirect_url = "http://%(ip)s:%(port)s/product/regcode_reset?user_name=%(name)s&val_code=%(val_code)s"%{
            "ip": ser_url,
            "port": ser_port,
            "name": user_name,
            "val_code": val_code
        }
        html = """
            <html>
              <head></head>
              <body>
                <p>Hi!<br>
                   <a href="%(redirect_url)s">Please verify email. </a>
                </p>
              </body>
            </html>
            """
        if not send_email(email, html%{"redirect_url":redirect_url}, "Verify email"):
            self.finish(json.dumps({'state': 3, "message": "send email faild"}))
            return
        self.finish(json.dumps({'state': 3, "message": "Reset ok"}))

    def get(self):
        user_name = self.get_argument('user_name', '')
        val_code = self.get_argument("val_code", "")
        redirect_url = self.get_argument("redirect_url", "")
