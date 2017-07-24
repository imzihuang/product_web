#!/usr/bin/python
# -*- coding: utf-8 -*-

import datetime
from sqlalchemy.sql import and_, or_
from common.convert import bs2unicode
import models
from common.log_client import gen_log
from base import get_session, get_engine


def convert_model(class_name, info_dic):
    """
    字典->model
    :param class_name:
    :param info_dic:
    :return:
    """
    try:
        class_model = getattr(models, class_name)
        model = class_model()
        for k,v in info_dic.iteritems():
            setattr(model, k, v)
        return model
    except Exception as ex:
        gen_log.error("%s convert error: %r"%(class_name, ex))

def model_query(session, class_name, query_dict):
    """
    通用查询，单元测试ut
    :param session:
    :param class_name: 实体名
    :param query_dict: 查询条件，格式：{'device_name':['FWQSB'], 'device_sn':['27350626']}
    :return: query
    """
    try:
        class_model = getattr(models, class_name)
        query = session.query(class_model)
        for key, value in query_dict.iteritems():
            column_name = getattr(class_model, key)
            query = query.filter(getattr(column_name, 'in_')(value))
        return query
    except Exception as ex:
        gen_log.error("%s query error: %r"%(class_name, ex))

def pu_add(ip, html, product_id, product_name):
    engine = get_engine()
    session = get_session()
    suffix_name = datetime.datetime.now().strftime('%Y%m')
    Product_PU = models.get_product_pu(suffix_name)
    try:
        Product_PU.metadata.create_all(engine)
        query = session.query(Product_PU.pu_count)
        query = query.filter(Product_PU.ip == ip and Product_PU.html==html and Product_PU.product_id==product_id)
        result = query.first()
        pu_count = 1
        if not result:
            result = Product_PU()
            setattr(result, "ip", ip)
            setattr(result, "html", html)
            setattr(result, "product_id", product_id)
            setattr(result, "product_name", product_name)
            setattr(result, "pu_count", pu_count)
            session.add(result)
        else:
            pu_count = result[0] + 1
            query.update({
                Product_PU.pu_count: pu_count
            })
        session.commit()
        return pu_count
    except Exception as ex:
        gen_log.error("pu add error:%r"%ex)
        return 0
    finally:
        session.close()

