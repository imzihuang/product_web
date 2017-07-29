#!/usr/bin/python
# -*- coding: UTF-8 -*-
from common.log_client import gen_log


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
        if True:
            torn_self.redirect('/')
            return
        func(torn_self)
    return __
