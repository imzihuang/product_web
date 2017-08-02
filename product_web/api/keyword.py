#coding:utf-8

import json
import os
from tornado.web import RequestHandler
from datetime import datetime
from logic import keyword as loc_keywod
from common.log_client import gen_log
from base import verify_api_login

class KeywordHandler(RequestHandler):
    def get(self, *args, **kwargs):
        keyword_name = self.get_argument("keyword_name", "")
        offset = int(self.get_argument("offset", 0))
        limit = int(self.get_argument("limit", 0))
        if keyword_name:
            keyword_info = loc_keywod.get_keyword(name=keyword_name)
            self.finish({'state': '0', 'data': keyword_info})
            return
        keyword_list = loc_keywod.get_keyword(offset=offset, limit=limit)
        self.finish({'state': '0', 'data': keyword_list})

    @verify_api_login
    def put(self):
        """"add keyword"""
        upload_path = os.path.abspath(os.path.dirname(__file__) + os.path.sep + "..")
        upload_path = os.path.join(upload_path, 'static')
        file_metas = self.request.files.get('keyword_img', '')

        # save img
        img_path = ""
        keyword_name = self.get_argument("keyword_name", "")
        theme = self.get_argument("theme", '')
        gen_log.info("--------name, theme:%s, %s"%(keyword_name, theme))
        if not keyword_name:
            self.finish({'state': '3', 'message': 'keyword name is none', 'error': 'keyword name is none'})
            return
        if not theme:
            self.finish({'state': '4', 'message': 'keyword theme is none', 'error': 'keyword theme is none'})
            return
        for meta in file_metas:
            filename = meta['filename']
            filename = keyword_name + "." + filename.rpartition(".")[-1] #rename img meta
            #content_type = meta['content_type']
            img_path = os.path.join("keyword_img", filename)
            filepath = os.path.join(upload_path, img_path)
            with open(filepath, 'wb') as up:
                up.write(meta['body'])
        if not img_path:
            self.finish({'state': '1', 'message': 'img is none', 'error': 'img is none'})
            return
        data = {
            "name": keyword_name,
            "source": self.get_argument("source", ''),
            "theme": self.get_argument("theme", ''),
            "ori_price": int(self.get_argument("ori_price", 0)),
            "con_price": int(self.get_argument("con_price", 0)),
            "postage_price": int(self.get_argument("postage_price", 0)),
            "description": self.get_argument("description", ""),
            "sort_num": int(self.get_argument("sort_num", 10000)),
            "img_path": img_path,
            "recommend": int(self.get_argument("recommend", 0)),
        }

        _ = loc_keywod.add_keyword(data)
        if not _:
            self.finish({'state': '2', 'message': 'keyword exit', 'error': 'keyword exit'})
            return

        self.finish({'state': '0', 'message': 'add keyword ok'})


class UpdateKeywordHandler(RequestHandler):
    @verify_api_login
    def put(self, *args, **kwargs):
        """update keyword"""
        keyword_name = self.get_argument("keyword_name", "")
        new_keyword_name = self.get_argument("new_name", "")
        if not keyword_name:
            self.finish({'state': '3', 'message': 'keyword name is none'})
            return
        update_data = {}
        file_metas = self.request.files.get('keyword_img', '')
        if file_metas:
            img_path = ""
            upload_path = os.path.abspath(os.path.dirname(__file__) + os.path.sep + "..")
            upload_path = os.path.join(upload_path, 'static')
            for meta in file_metas:
                filename = meta['filename']
                pre_file = new_keyword_name or keyword_name
                filename = pre_file + "." + filename.rpartition(".")[-1] #rename img meta
                img_path = os.path.join("keyword_img", filename)
                filepath = os.path.join(upload_path, img_path)
                with open(filepath, 'wb') as up:
                    up.write(meta['body'])
            if not img_path:
                self.finish({'state': '1', 'message': 'img is none'})
                return
            update_data = {"img_path": img_path}

        if new_keyword_name:
            update_data.update({"name": new_keyword_name})
        source = self.get_argument("source", '')
        if source:
            update_data.update({"source": source})
        theme = self.get_argument("theme", '')
        if theme:
            update_data.update({"theme": theme})
        ori_price = int(self.get_argument("ori_price", -1))
        if ori_price > -1:
            update_data.update({"ori_price": ori_price})
        con_price = int(self.get_argument("con_price", -1))
        if con_price > -1:
            update_data.update({"con_price": con_price})
        postage_price = int(self.get_argument("postage_price", -1))
        if postage_price > -1:
            update_data.update({"postage_price": postage_price})

        count_down_at = self.get_argument("count_down_at", "")
        if count_down_at:
            update_data.update({"count_down_at": count_down_at})
        description = self.get_argument("description", "")
        if description:
            update_data.update({"description": description})
        like_add_count = int(self.get_argument("like_add_count", -1))
        if like_add_count > -1:
            update_data.update({"like_add_count": like_add_count})
        sort_num = int(self.get_argument("sort_num", -1))
        if sort_num > -1:
            update_data.update({"sort_num": sort_num})
        recommend = int(self.get_argument("recommend", -1))
        if recommend > -1:
            update_data.update({"recommend": recommend})

        if update_data:
            _ = loc_keywod.update_keyword(update_data, {"name": [keyword_name]})
            if not _:
                self.finish({'state': '2', 'message': 'Update keyword faild'})
                return
        self.finish({'state': '0', 'message': 'Update keyword ok'})

class DeleteKeywordHandler(RequestHandler):
    @verify_api_login
    def post(self):
        keyword_name = self.get_argument("keyword_name")
        _k_names = keyword_name.split("|")
        _all_keyword = loc_keywod.get_keyword_by_names(_k_names)
        _ = loc_keywod.del_keyword(_k_names)
        if not _:
            self.finish({'state': '1', 'message': 'delete keyword faild'})
            return
        # del img
        try:
            upload_path = os.path.abspath(os.path.dirname(__file__) + os.path.sep + "..")
            upload_path = os.path.join(upload_path, 'static')
            for keyword in _all_keyword:
                os.remove(os.path.join(upload_path, keyword.get("img_path")))
        except Exception as ex:
            gen_log.error("del product img error:%r"%ex)
        self.finish({'state': '0', 'message': 'delete keyword ok'})
