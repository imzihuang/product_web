#coding:utf-8

import json
import os
from tornado.web import RequestHandler
from common.convert import bs2utf8
from logic import operation as loc_operation
from common.log_client import gen_log


class LikeProductHandler(RequestHandler):
    def post(self, *args, **kwargs):
        product_id = int(self.get_argument("product_id", 0))
        user_name = self.get_secure_cookie('user_name', '')
        if not product_id or not user_name:
            self.finish({'state': '1', 'message': 'Not login or without product_id'})
            return
        _ = loc_operation.like_product(product_id, user_name)
        _count = loc_operation.get_product_like_count(product_id)
        if not _:
            self.finish({'state': '2', 'message': 'The user has already clicked.', 'count': _count})
            return
        self.finish({'state': '0', 'message': 'Click product ok', 'count': _count})

class LikeKeywordHandler(RequestHandler):
    def post(self, *args, **kwargs):
        keyword_id = int(self.get_argument("keyword_id", 0))
        user_name = self.get_secure_cookie('user_name', '')
        if not keyword_id or not user_name:
            self.finish({'state': '1', 'message': 'Not login or without keyword_id'})
            return
        _ = loc_operation.like_keyword(keyword_id, user_name)
        _count = loc_operation.get_keyword_like_count(keyword_id)
        if not _:
            self.finish({'state': '2', 'message': ' The user has already clicked.' ,'count': _count})
            return
        self.finish({'state': '0', 'message': 'Click keyword ok', 'count': _count})

