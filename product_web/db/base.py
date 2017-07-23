#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import threading
from common.ini_client import ini_load

#_conf = dict(conf_load('auth.config')).get('auth.config')
_conf=ini_load('config/mysql.ini')
_dic_con=_conf.get_fields('product_db')

connect = 'mysql://{0}:{1}@{2}:{3}/{4}?charset=utf8'.format(
    _dic_con.get('user'),
    _dic_con.get('password'),
    _dic_con.get('host'),
    _dic_con.get('port', 3306),
    _dic_con.get('database')
)


#Base = declarative_base(bind=engine)

_LOCK = threading.Lock()
_FACADE = None


def _create_facade_lazily():
    global _LOCK
    with _LOCK:
        global _FACADE
        if _FACADE is None:
            args = {
                "encoding": "utf8",
                "convert_unicode": True
            }
            _FACADE = EngineFacade(
                connect,
                **args
            )

        return _FACADE

def get_engine():
    facade = _create_facade_lazily()
    return facade.get_engine()


def get_session():
    facade = _create_facade_lazily()
    return facade.get_session()

class EngineFacade():
    def __init__(self, connect, **kwargs):
        self.connect = connect
        self.engine = create_engine(connect, **kwargs)

    def get_engine(self):
        return self.engine

    def get_session(self):
        Session = sessionmaker(bind=self.engine)
        return Session()
