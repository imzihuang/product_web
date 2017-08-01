#!/usr/bin/python
# -*- coding: utf-8 -*-
from db.base import get_session, get_engine
from db import api
from common.log_client import gen_log

def get_keyword_like_count(keyword_id):
    try:
        session = get_session()
        query = api.model_query(session, "Like", {"keyword_id": [keyword_id]})
        return query.count()
    except Exception as ex:
        gen_log.log("Query keyword like count error:%r."%ex)
        return 0
    finally:
        session.close()

def get_product_like_count(product_id):
    try:
        session = get_session()
        query = api.model_query(session, "Like", {"product_id": [product_id]})
        return query.count()
    except Exception as ex:
        gen_log.log("Query product like count error:%r."%ex)
        return 0
    finally:
        session.close()

def like_keyword(keyword_id, user_name):
    try:
        session = get_session()
        query = api.model_query(session, "Like", {"keyword_id": [keyword_id], "user_name": [user_name]})
        if query.count() > 0:
            gen_log.log("The user has already clicked.")
            return False
        query = api.model_query(session, "ProductKeyword", {"keyword_id": [keyword_id]})
        if query.count() == 0:
            gen_log.log("Keyword id no exist.")
            return False
        data = {
            "user_name": user_name,
            "keyword_id": keyword_id
        }
        model_user = api.convert_model("Like", data)
        session.add(model_user)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("like keyword error:%r"%ex)
        return False
    finally:
        session.close()

def like_product(product_id, user_name):
    try:
        session = get_session()
        query = api.model_query(session, "Like", {"product_id": [product_id], "user_name": [user_name]})
        if query.count() > 0:
            gen_log.log("The user has already clicked.")
            return False
        query = api.model_query(session, "Product", {"product_id": [product_id]})
        if query.count() == 0:
            gen_log.log("Product id no exist.")
            return False
        data = {
            "user_name": user_name,
            "product_id": product_id
        }
        model_user = api.convert_model("Like", data)
        session.add(model_user)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("like product error:%r" % ex)
        return False
    finally:
        session.close()