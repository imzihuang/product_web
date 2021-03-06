#!/usr/bin/python
# -*- coding: utf-8 -*-

import datetime
from sqlalchemy.sql import func
import models
from common.log_client import gen_log

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
        raise ex


def get_product_like_theme(session, product_keyword):
    """
    模糊查询，产品主题
    :param product_keyword:
    :return:
    """
    query = session.query(models.Product).filter(models.Product.theme.like("%"+product_keyword+"%"))
    return query

def set_product_sort_num(session, sort_num):
    """
    设置产品的顺序，大于等于sort_num的产品顺序，且连续的自动加1
    :param session:
    :param sort_num:
    :return:
    """
    query = session.query(models.Product).filter(models.Product.sort_num>=sort_num)
    products = query.order_by("sort_num").all()
    current_sort_num = sort_num
    for product in products:
        if product.sort_num > current_sort_num:
            return True
        current_sort_num += 1
        session.query(models.Product).filter(models.Product.id == product.id).update({"sort_num":current_sort_num}, synchronize_session=False)
    return True

def set_keyword_sort_num(session, sort_num):
    query = session.query(models.ProductKeyword).filter(models.ProductKeyword.sort_num>=sort_num)
    keywords = query.order_by("sort_num").all()
    current_sort_num = sort_num
    for keyword in keywords:
        if keyword.sort_num > current_sort_num:
            return True
        current_sort_num += 1
        session.query(models.ProductKeyword).filter(models.ProductKeyword.id==keyword.id).update({"sort_num":current_sort_num}, synchronize_session=False)
    return True

def get_pv_count(session, ip="", html="", start="", end=""):
    query = session.query(models.Product_PU.ip, models.Product_PU.html, func.count(models.Product_PU.html))
    if ip:
        query = query.filter(models.Product_PU.ip == ip)
    if html:
        query = query.filter(models.Product_PU.html == html)
    if start:
        query = query.filter(models.Product_PU.visit_date >= start)
    if end:
        query = query.filter(models.Product_PU.visit_date <= end)
    return query.group_by(models.Product_PU.ip).group_by(models.Product_PU.html)

def get_pu_count(session, ip="", html="", start="", end=""):
    query = session.query(models.Product_PU.ip, models.Product_PU.html, func.sum(models.Product_PU.pu_count))
    if ip:
        query = query.filter(models.Product_PU.ip == ip)
    if html:
        query = query.filter(models.Product_PU.html == html)
    if start:
        query = query.filter(models.Product_PU.visit_date >= start)
    if end:
        query = query.filter(models.Product_PU.visit_date <= end)
    return query.group_by(models.Product_PU.ip).group_by(models.Product_PU.html)

