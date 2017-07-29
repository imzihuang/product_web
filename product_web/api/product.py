#coding:utf-8

import json
import os
from tornado.web import RequestHandler
from datetime import datetime
from common.convert import bs2utf8
from logic import product as loc_product
from common.log_client import gen_log

class ProductHandler(RequestHandler):
    def get(self, *args, **kwargs):
        product_name = self.get_argument("product_name", "")
        is_like_query = int(self.get_argument("like_query", 0))
        offset = int(self.get_argument("offset", 0))
        limit = int(self.get_argument("limit", 0))
        if is_like_query == 1:
            keyword = self.get_argument("keyword")
            product_list = loc_product.get_product_like_name(keyword, offset, limit)
            self.finish({'state': '0', 'data': product_list})
            return
        if product_name:
            product = loc_product.get_product(name=product_name)
            self.finish({'state': '0', 'data': product})
            return
        product_list = loc_product.get_product(offset=offset, limit=limit)
        self.finish({'state': '0', 'data': product_list})

    def put(self):
        """"add product"""
        upload_path = os.path.abspath(os.path.dirname(__file__)+os.path.sep+"..")
        upload_path = os.path.join(upload_path, 'static')
        file_metas = self.request.files.get('product_img', 'file')

        # save img
        img_path = ""
        product_name = self.get_argument("product_name")
        theme = self.get_argument("theme", '')
        gen_log.info('lzh----product name:%s'%product_name)
        if not product_name:
            self.finish({'state': '3', 'message': 'Product name is none', 'error': 'Product name is none'})
            return
        if not theme:
            self.finish({'state': '4', 'message': 'Product theme is none', 'error': 'Product theme is none'})
            return
        for meta in file_metas:
            filename = meta['filename']
            filename = product_name + "." + filename.rpartition(".")[-1] #rename img meta
            #content_type = meta['content_type']
            img_path = os.path.join("product_img", filename)
            filepath = os.path.join(upload_path, img_path)
            with open(filepath, 'wb') as up:
                up.write(meta['body'])
        if not img_path:
            self.finish({'state': '1', 'message': 'img is none', 'error': 'img is none'})
            return
        data = {
            "name": product_name,
            "source": self.get_argument("source", ''),
            "theme": theme,
            "ori_price": int(self.get_argument("ori_price", 0)),
            "con_price": int(self.get_argument("con_price", 0)),
            "postage_price": int(self.get_argument("postage_price", 0)),
            "description": self.get_argument("description", ""),
            "links": self.get_argument("links", ""),
            "sort_num": int(self.get_argument("sort_num", 10000)),
            "img_path": img_path,
            "recommend": int(self.get_argument("recommend", 0)),
        }

        _ = loc_product.add_product(data)
        if not _:
            self.finish({'state': '2', 'message': 'product exit', 'error': 'product exit'})
            return

        self.finish({'state': '0', 'message': 'add product ok'})

    def post(self):
        """update product"""
        product_name = self.get_argument("product_name")
        update_data = {}
        file_metas = self.request.files.get('product_img', 'file')
        if file_metas:
            img_path = ""
            upload_path = os.path.join(os.path.dirname(__file__), 'static')
            for meta in file_metas:
                filename = meta['filename']
                filename = product_name + "." + filename.rpartition(".")[-1] #rename img meta
                img_path = os.path.join("product_img", filename)
                filepath = os.path.join(upload_path, img_path)
                with open(filepath, 'wb') as up:
                    up.write(meta['body'])
            if not img_path:
                self.finish({'state': '1', 'message': 'img is none'})
                return
            update_data = {"img_path": img_path}

        new_product_name = self.get_argument("new_name", "")
        if new_product_name:
            update_data.update({"name": new_product_name})
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
        if like_add_count>-1:
            update_data.update({"like_add_count": like_add_count})
        links = self.get_argument("links", "")
        if links:
            update_data.update({"links": links})
        sort_num = int(self.get_argument("sort_num", -1))
        if sort_num > -1:
            update_data.update({"sort_num": sort_num})
        recommend = int(self.get_argument("recommend", -1))
        if recommend > -1:
            update_data.update({"recommend": recommend})

        if update_data:
            _ = loc_product.update_product(update_data, {"name": [product_name]})
            if not _:
                self.finish({'state': '2', 'message': 'update product faild'})
                return
        self.finish({'state': '0', 'message': 'ok'})

    def delete(self):
        product_name = self.get_argument("product_name")
        _ = loc_product.del_product(product_name)
        if not _:
            self.finish({'state': '1', 'message': 'delete product faild'})
            return
        self.finish({'state': '0', 'message': 'delete product ok'})
