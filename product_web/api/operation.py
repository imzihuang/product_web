#coding:utf-8

import json
import os
from tornado.web import RequestHandler
from common.convert import bs2utf8, is_email
from logic import operation as loc_operation
from logic import baseinfo as loc_base
from logic import pvpu as loc_pvpu
from logic import user as loc_user
from common.log_client import gen_log
from base import verify_api_login
from ser_email.ser_email import gmail_send_email

class LikeProductHandler(RequestHandler):
    @verify_api_login
    def post(self, *args, **kwargs):
        product_id = int(self.get_argument("product_id", 0))
        user_name = self.get_secure_cookie('user_name')
        if not product_id or not user_name:
            self.finish({'state': '1', 'message': 'ithout product_id'})
            return
        _ = loc_operation.like_product(product_id, user_name)
        _count = loc_operation.get_product_like_count(product_id)
        if not _:
            self.finish({'state': '2', 'message': 'The user has already clicked.', 'count': _count})
            return
        self.finish({'state': '0', 'message': 'Click product ok', 'count': _count})

class LikeKeywordHandler(RequestHandler):
    @verify_api_login
    def post(self, *args, **kwargs):
        keyword_id = int(self.get_argument("keyword_id", 0))
        user_name = self.get_secure_cookie('user_name')
        if not keyword_id or not user_name:
            self.finish({'state': '1', 'message': 'Without keyword_id'})
            return
        _ = loc_operation.like_keyword(keyword_id, user_name)
        _count = loc_operation.get_keyword_like_count(keyword_id)
        if not _:
            self.finish({'state': '2', 'message': ' The user has already clicked.' ,'count': _count})
            return
        self.finish({'state': '0', 'message': 'Click keyword ok', 'count': _count})

class UserHandler(RequestHandler):
    def get(self):
        _user_list = loc_user.get_all_user()
        self.finish({'state': "0", 'message': 'Get user info ok', 'data': _user_list})

class CompanyHandler(RequestHandler):
    def get(self, *args, **kwargs):
        _ = loc_base.get_company()
        self.finish({'state': '0', 'data': _})

    @verify_api_login
    def post(self, *args, **kwargs):
        old_name = self.get_argument("old_name", "")
        if not old_name:
            self.finish({'state': '1', 'message': 'Company name is none'})
            return
        update_data = {}
        new_name = self.get_argument("new_name", "")
        if new_name:
            update_data.update({"name": new_name})
        email = self.get_argument("email", "")
        if email:
            update_data.update({"email": email})
        telephone = self.get_argument("telephone", "")
        if telephone:
            update_data.update({"telephone": telephone})
        address = self.get_argument("address", "")
        if address:
            update_data.update({"address": address})
        country = self.get_argument("country", "")
        if country:
            update_data.update({"country": country})
        province = self.get_argument("province", "")
        if province:
            update_data.update({"province": province})
        city = self.get_argument("city", "")
        if city:
            update_data.update({"city": city})
        description = self.get_argument("description", "")
        if description:
            update_data.update({"description": description})
        if update_data:
            _ = loc_base.update_company(update_data, old_name)
            if not _:
                self.finish({'state': '2', 'message': 'Update company faild'})
                return
        self.finish({'state': '0', 'message': 'Update company ok'})


class PVPUHandler(RequestHandler):
    def get(self, *args, **kwargs):
        method = self.get_argument("method", "")
        if not method:
            self.finish({'state': "1", 'message': 'Not Method', 'data': []})
            return
        _html = bs2utf8(self.get_argument("page", ""))
        _start = bs2utf8(self.get_argument("start", ""))
        _end = bs2utf8(self.get_argument("end", ""))
        if method == "pv":
            _ = loc_pvpu.get_pv(html=_html, start=_start, end=_end)
            self.finish({'state': "0", 'message': 'Get pv ok', 'data': _})
            return

        if method == "pu":
            _ = loc_pvpu.get_pu(html=_html, start=_start, end=_end)
            self.finish({'state': "0", 'message': 'Get pu ok', 'data': _})
            return
        self.finish({'state': "2", 'message': 'Method error', 'data': []})
        return

from common.create_excel import make_excel
class ExcelHandler(RequestHandler):

    def get(self):
        method = self.get_argument("method", "")
        if not method:
            self.finish()
            return
        filename = method+".xls"
        if method == "user":
            _user_list = loc_user.get_all_user()
            _excel = make_excel(_user_list)
            self.write(_excel)

        _html = bs2utf8(self.get_argument("page", ""))
        _start = bs2utf8(self.get_argument("start", ""))
        _end = bs2utf8(self.get_argument("end", ""))
        if method == "pv":
            _pv_list = loc_pvpu.get_pv(html=_html, start=_start, end=_end)
            _excel = make_excel(_pv_list)
            self.write(_excel)
            self.write(_excel)
        if method == "pu":
            _pu_list = loc_pvpu.get_pu(html=_html, start=_start, end=_end)
            _excel = make_excel(_pu_list)
            self.write(_excel)
        self.set_header('Content-Type', 'application/octet-stream')
        self.set_header('Content-Disposition', 'attachment; filename=' + filename)
        self.finish()


class SendEmailHandler(RequestHandler):
    @verify_api_login
    def post(self, *args, **kwargs):
        user_name=self.get_secure_cookie('user_name')
        company_info = loc_base.get_company()
        send_email = company_info.get("email", "")
        if not send_email or not is_email(send_email):
            self.finish(json.dumps({'state': 1, "message": "Company email format error."}))
            return
        message = self.get_argument("message", "")
        subject = self.get_argument("subject", "")
        if not message or not subject:
            self.finish(json.dumps({'state': 2, "message": "Message or subject is none."}))
            return

        html = """
            <html>
              <head></head>
              <body>
                <p>
                   %(user_name)s:
                   <br>
                   %(message)s
                </p>
              </body>
            </html>
            """
        if not gmail_send_email(send_email, html%{"user_name":user_name, "message":message}, subject, msg_type="html"):
            self.finish(json.dumps({'state': 3, "message": "send email faild"}))
            return
        self.finish(json.dumps({'state': 0, "message": "send ok"}))

