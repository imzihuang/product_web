#coding:utf-8

import json
import os
from tornado.web import RequestHandler
from datetime import datetime
from common.convert import bs2utf8
from logic import keyword as loc_keywod

class KeywordHandler(RequestHandler):
    def get(self, *args, **kwargs):
        keyword_name = bs2utf8(self.get_argument("keyword_name"))
        offset = int(self.get("offset", 0))
        limit = int(self.get("limit", 0))
        if keyword_name:
            keyword_info = loc_keywod.get_keyword(name=keyword_name)
            self.finish({'state': '0', 'data': keyword_info})
            return
        keyword_list = loc_keywod.get_keyword(offset=offset, limit=limit)
        self.finish({'state': '0', 'data': keyword_list})

    def put(self):
        """"add keyword"""
        upload_path = os.path.join(os.path.dirname(__file__), 'static')
        file_metas = self.request.files.get('keyword_img', 'file')

        # save img
        img_path = ""
        keyword_name = bs2utf8(self.get_argument("keyword_name"))
        for meta in file_metas:
            filename = meta['filename']
            filename = keyword_name + "." + filename.rpartition(".")[-1] #rename img meta
            #content_type = meta['content_type']
            img_path = os.path.join("keyword_img", filename)
            filepath = os.path.join(upload_path, img_path)
            with open(filepath, 'wb') as up:
                up.write(meta['body'])
        if not img_path:
            self.finish({'state': '1', 'message': 'img is none'})
            return
        data = {
            "name": keyword_name,
            "source": bs2utf8(self.get_argument("source", '')),
            "theme": bs2utf8(self.get_argument("theme", '')),
            "ori_price": self.get_argument("ori_price", 0),
            "con_price": self.get_argument("con_price", 0),
            "postage_price": self.get_argument("postage_price", 0),
            "description": bs2utf8(self.get_argument("description", "")),
            "sort_num": self.get_argument("sort_num", 10000),
            "img_path": img_path,
            "recommend": self.get_argument("recommend", 0),
        }

        _ = loc_keywod.add_keyword(data)
        if not _:
            self.finish({'state': '2', 'message': 'add keyword faild'})
            return

        self.finish({'state': '0', 'message': 'add keyword ok'})

    def post(self):
        """update keyword"""
        keyword_name = bs2utf8(self.get_argument("keyword_name"))
        update_data = {}
        file_metas = self.request.files.get('keyword_img', 'file')
        if file_metas:
            img_path = ""
            upload_path = os.path.join(os.path.dirname(__file__), 'static')
            for meta in file_metas:
                filename = meta['filename']
                filename = keyword_name + "." + filename.rpartition(".")[-1] #rename img meta
                img_path = os.path.join("product_img", filename)
                filepath = os.path.join(upload_path, img_path)
                with open(filepath, 'wb') as up:
                    up.write(meta['body'])
            if not img_path:
                self.finish({'state': '1', 'message': 'img is none'})
                return
            update_data = {"img_path": img_path}

        new_keyword_name = bs2utf8(self.get_argument("new_name", ""))
        if new_keyword_name:
            update_data.update({"name": new_keyword_name})
        source = bs2utf8(self.get_argument("source", ''))
        if source:
            update_data.update({"source": source})
        theme = bs2utf8(self.get_argument("theme", ''))
        if theme:
            update_data.update({"theme": theme}) 
        ori_price = self.get_argument("ori_price", -1)
        if ori_price > -1:
            update_data.update({"ori_price": ori_price})
        con_price = self.get_argument("con_price", -1)
        if con_price > -1:
            update_data.update({"con_price": con_price})
        postage_price = self.get_argument("postage_price", -1)
        if postage_price > -1:
            update_data.update({"postage_price": postage_price})

        count_down_at = bs2utf8(self.get_argument("count_down_at", ""))
        if count_down_at:
            update_data.update({"count_down_at": count_down_at})
        description = bs2utf8(self.get_argument("description", ""))
        if description:
            update_data.update({"description": description})
        like_add_count = self.get_argument("like_add_count", -1)
        if like_add_count > -1:
            update_data.update({"like_add_count": like_add_count})
        sort_num = self.get_argument("sort_num", -1)
        if sort_num > -1:
            update_data.update({"sort_num": sort_num})
        recommend = self.get_argument("recommend", -1)
        if recommend > -1:
            update_data.update({"recommend": recommend})

        if update_data:
            _ = loc_keywod.update_product(update_data, {"name": [keyword_name]})
            if not _:
                self.finish({'state': '2', 'message': 'update keyword faild'})
                return
        self.finish({'state': '0', 'message': 'ok'})

    def delete(self):
        keyword_name = bs2utf8(self.get_argument("keyword_name"))
        _ = loc_keywod.del_keyword(keyword_name)
        if not _:
            self.finish({'state': '1', 'message': 'delete keyword faild'})
            return
        self.finish({'state': '0', 'message': 'delete keyword ok'})