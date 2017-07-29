#!/usr/bin/python
# -*- coding: utf-8 -*-

from common.log_client import gen_log
from db.base import get_session
from db import api

def get_keyword(**kwargs):
    id = kwargs.get("id", "")
    name = kwargs.get("name", "")
    offset = kwargs.get("offset", 0)
    limit = kwargs.get("limit", 0)
    try:
        session = get_session()
        if id:
            query = api.model_query(session, "ProductKeyword", {"id": [id]})
            result = query.first()
            return result.to_dict()
        if name:
            query = api.model_query(session, "ProductKeyword", {"name": [name]})
            result = query.first()
            return result.to_dict()
        query = api.model_query(session, "ProductKeyword", {})
        results = query.order_by("sort_num").all()
        return [result.to_dict() for result in results]
    except Exception as ex:
        gen_log.error("get product keyword error:%r"%ex)
    finally:
        session.close()

def verify_keyword(session, name):
    """
    :param session:
    :param name:
    :return:
    """
    if not name:
        return 0
    query = api.model_query(session, "ProductKeyword", {"name": [name]})
    if query.count() > 0:
        return 1
    return 0

def add_keyword(keywordinfo):
    try:
        name = keywordinfo.get("name", "")
        session = get_session()
        _ = verify_keyword(session, name)
        if _ != 0:
            return False
        sort_num = keywordinfo.get("sort_num", 10000)
        if sort_num == 0:
            keywordinfo.update({"sort_num": 10000})
        if sort_num>0 and sort_num<10000:
            api.set_keyword_sort_num(session, sort_num)

        model_keyword = api.convert_model("ProductKeyword", keywordinfo)
        session.add(model_keyword)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("add keyword error:%r"%ex)
        raise ex
    finally:
        session.close()

def update_keyword(keywordinfo, con_dic):
    try:
        session = get_session()
        sort_num = keywordinfo.get("sort_num", 10000)
        if sort_num == 0:
            keywordinfo.update({"sort_num": 10000})
        if sort_num > 0 and sort_num<10000:
            api.set_keyword_sort_num(session, sort_num)

        query = api.model_query(session, "ProductKeyword", con_dic)
        query.update(keywordinfo, synchronize_session=False)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("update keyword error:%r"%ex)
        return False
    finally:
        session.close()

def del_keyword(keyword_name):
    try:
        session = get_session()
        query = api.model_query(session, "ProductKeyword", {"name": [keyword_name]})
        query.delete(synchronize_session=False)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("del keyword error:%r"%ex)
        return False
    finally:
        session.close()
