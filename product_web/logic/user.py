#!/usr/bin/python
# -*- coding: utf-8 -*-

from common.log_client import gen_log
from db.base import get_session
from db import api, models
#from common.convert import bs2unicode

def is_exit_avai_email(email=""):
    if not email:
        raise ValueError('email is none')
    try:
        #email = bs2unicode(email)
        session = get_session()
        query = api.model_query(session, "User", {"email": email, "status": "available"})
        result = query.first()
        if result:
            return True
        return False
    except Exception as ex:
        gen_log.error("exit email error:%r"%ex)
        raise ex
    finally:
        session.close()

def get_creating_user(email=""):
    if not email:
        return
    try:
        #email = bs2unicode(email)
        session = get_session()
        query = api.model_query(session, "User", {"email": email, "status": "creating"})
        result = query.first()
        return result
    except Exception as ex:
        gen_log.error("get creating user error:%r"%ex)
    finally:
        session.close()

def get_available_user(**kwargs):
    email = kwargs.get("email", "")
    user_name = kwargs.get("name", "")
    try:
        session = get_session()
        if email:
            query = api.model_query(session, "User", {"email": email, "status": "available"})
            result = query.first()
            return result
        if user_name:
            query = api.model_query(session, "User", {"name": user_name, "status": "available"})
            result = query.first()
            return result
    except Exception as ex:
        gen_log.error("get available user error:%r"%ex)
    finally:
        session.close()


def verify_user(session, name="", email="", telephone=""):
    """
    验证用户名、邮箱、手机号码不能重复
    :param name:
    :param email:
    :param telephone:
    :return: 0：没有重复；1：邮箱重复；2：用户名重复；3：电话号码重复；4：代码错误
    """
    try:

        if email:
            query = api.model_query(session, "User", {"email": email})
            if query.count()>0:
                return 1
        if name:
            query = api.model_query(session, "User", {"name": name})
            if query.count()>0:
                return 2
        if telephone:
            query = api.model_query(session, "User", {"telephone": telephone})
            if query.count()>0:
                return 3
        return 0
    except Exception as ex:
        gen_log.error("get available user error:%r"%ex)
        return 10

def add_user(userinfo):
    """
    添加用户
    :param userinfo: 字典，key必须和models.User匹配
    :return:
    """
    try:
        email = userinfo.get("email", "")
        name = userinfo.get("name", "")
        telephone = userinfo.get("telephone", "")
        session = get_session()
        _ = verify_user(session, name, email, telephone)
        if _ != 0:
            raise ValueError('add user fail:%d'%_)
        model_user = api.convert_model("User", userinfo)
        session.add(model_user)
        session.commit()
    except Exception as ex:
        gen_log.error("add user error:%r"%ex)
        raise ex
    finally:
        session.close()

def update_user(userinfo, con_dic):
    """
    更新用户
    :param userinfo: 字典，key必须和models.User匹配，待更新的用户信息
    :param con_dic: 字典，待更新的条件
    :return:
    """
    try:
        session = get_session()
        query = api.model_query(session, "User", con_dic)
        query.update(userinfo, synchronize_session=False)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("update user error:%r"%ex)
        return False
    finally:
        session.close()


