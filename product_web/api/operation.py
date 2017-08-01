#coding:utf-8

import json
import os
from tornado.web import RequestHandler
from common.convert import bs2utf8
from logic import operation as loc_operation
from logic import baseinfo as loc_base
from common.log_client import gen_log
from base import verify_api_login


class LikeProductHandler(RequestHandler):
    @verify_api_login
    def post(self, *args, **kwargs):
        product_id = int(self.get_argument("product_id", 0))
        user_name = self.get_secure_cookie('user_name', '')
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
        user_name = self.get_secure_cookie('user_name', '')
        if not keyword_id or not user_name:
            self.finish({'state': '1', 'message': 'Without keyword_id'})
            return
        _ = loc_operation.like_keyword(keyword_id, user_name)
        _count = loc_operation.get_keyword_like_count(keyword_id)
        if not _:
            self.finish({'state': '2', 'message': ' The user has already clicked.' ,'count': _count})
            return
        self.finish({'state': '0', 'message': 'Click keyword ok', 'count': _count})

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




