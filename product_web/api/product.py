#coding:utf-8

from tornado.web import RequestHandler
import json
from common.convert import bs2utf8
from logic import product as loc_product

class ProductHandler(RequestHandler):
    def put(self):
        """"add product"""
        upload_path = os.path.join(os.path.dirname(__file__), 'static')
        file_metas = self.request.files.get('file-zh[]', 'file')
        
        # save img
        img_path = ""
        product_name = bs2utf8(self.get_argument("name"))
        for meta in file_metas:
            filename = meta['filename']
            filename = product_name + "." + filename.rpartition(".")[-1] #rename img meta
            content_type = meta['content_type']
            img_path = os.path.join("product_img", filename)
            filepath = os.path.join(upload_path, img_path)
            with open(filepath, 'wb') as up:
                up.write(meta['body'])
        if not img_path:
            self.finish({'state': '1', 'message': 'file is none'})
            return
        data = {
            "name": product_name,
            "source": bs2utf8(self.get_argument("name")),
            "ori_price": self.get_argument("ori_price"),
            "con_price": self.get_argument("con_price"),
            "postage_price": self.get_argument("postage_price"),
            "description": bs2utf8(self.get_argument("description")),
            "links": bs2utf8(self.get_argument("description")),
            "img_path": img_path
        }

        _ = loc_product.add_product(data):
        if not _:
            self.finish({'state': '2', 'message': 'add product faild'}) 
            return   

        self.finish({'state': '0', 'message': 'ok'})
       
    def post(self):
        """update product"""
        method = bs2utf8(self.get_argument("method"))
        product_name = bs2utf8(self.get_argument("name"))
        update_data = {}
        if method == "update_img":
            # update product img
            img_path = ""
            product_name = bs2utf8(self.get_argument("name"))
            for meta in file_metas:
                filename = meta['filename']
                filename = product_name + "." + filename.rpartition(".")[-1] #rename img meta
                content_type = meta['content_type']
                img_path = os.path.join("product_img", filename)
                filepath = os.path.join(upload_path, img_path)
                with open(filepath, 'wb') as up:
                    up.write(meta['body'])
            if not img_path:
                self.finish({'state': '1', 'message': 'img is none'})
                return
            update_data = {"img_path": img_path}
        if method == "update_cout_down":
            count_down_at = bs2utf8(self.get_argument("name"))
            count_down_at = datetime.strptime(count_down_at, "%Y-%m-%d %H:%M:%S")
            update_data = {"count_down_at": count_down_at}
        
         

 
