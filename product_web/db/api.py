#!/usr/bin/python
# -*- coding: utf-8 -*-

import datetime
from sqlalchemy import func
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
        # 如果查询不到改数据表，自动创建该表格
        _ = session.query(func.count(Product_PU.id))
        print _
    except Exception as ex:
        gen_log.info("pu not exit:%r"%ex)
        Product_PU.metadata.create_all(engine)
    try:
        query = session.query(Product_PU)
        query = query.filter(Product_PU.ip == ip and Product_PU.html==html and Product_PU.product_id==product_id)
        result = query.first()
        print result
        if not result:
            result = Product_PU()
            setattr(result, "ip", ip)
            setattr(result, "html", html)
            setattr(result, "product_id", product_id)
            setattr(result, "product_name", product_name)
            setattr(result, "pu_count", 1)
            session.add(result)
        else:
            query.update({
                Product_PU.pu_count: Product_PU.pu_count + 1
            })
        session.commit()
        return result
    except Exception as ex:
        gen_log.error("pu add error:%r"%ex)
    finally:
        session.close()

"""

def get_user(name=''):
    try:
        session = get_session()
        if not isinstance(name, basestring):
            return -1, 'name invaild'
        if not name:
            _ = session.query(User).all()
        else:
            name = bs2unicode(name)
            _ = session.query(User).filter(User.name == name).all()
        for info in _:
            info.hash_password = "" #移除密码
        return _
    except Exception,ex:
        return -1, ex.message
    finally:
        session.close()

def signin_user(user_dic):
    try:
        session = get_session()
        name = user_dic.get('username')
        if not name:
            return -1, '用户名异常'
        if session.query(User).filter(User.username == name).count()>0:
            return -1, '用户名已存在'

        pwd = bs2utf8(user_dic.get('hash_password'))
        if not pwd:
            return -1, '密码异常'
        pwd = get_md5(pwd) # 加密

        user_dic.update({'hash_password':pwd})
        _ = convert_model('UserInfo', user_dic)
        status, info =_
        if status == 0 and isinstance(info, UserInfo):
            r_info = copy.copy(info)
            session.add(info)
            session.commit()
            r_info.hash_password = ''#密码不返回
            return 0, r_info
        return _
    except Exception,ex:
        return -1, ex.message
    finally:
        session.close()
"""
