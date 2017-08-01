#!/usr/bin/python
# -*- coding: UTF-8 -*-
from common.log_client import gen_log
from logic import pvpu


def entry_id_data_args(func):
    """
    入口解析
    :param func:
    :return:
    """
    def __(torn_self):
        user_name = torn_self.get_secure_cookie('user_name')
        user_level = torn_self.get_secure_cookie('user_level')
        gen_log.info("entry:%s,%s"%(user_name, user_level))
        #if not user_name or user_level=="1":
        #if True:
        #    torn_self.redirect('/')
        #    return
        func(torn_self)
    return __

def verify_api_login(func):
    """
    :param func:
    :return:
    """
    def __(torn_self):
        user_name = torn_self.get_secure_cookie('user_name')
        if not user_name:
            torn_self.finish({'state': '10'})
            return
        func(torn_self)
    return __

def record_pv_pu(ip, html):
    try:
        pvpu.pu_add(ip, html)
    except Exception as ex:
        gen_log.error("record pu error:%r"%ex)
    try:
        pvpu.pv_add(ip, html)
    except Exception as ex:
        gen_log.error("record pv error:%r" % ex)
