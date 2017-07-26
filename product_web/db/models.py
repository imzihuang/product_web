#!/usr/bin/python
# -*- coding: utf-8 -*-
from sqlalchemy import Column, Table, MetaData

from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from base import get_engine

BaseModel = declarative_base()
DynamicDModel = declarative_base()

class User(BaseModel):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30), nullable=False)
    pwd = Column(VARCHAR(50), nullable=False)
    age = Column(SMALLINT)
    email = Column(VARCHAR(50), nullable=False)
    telephone = Column(VARCHAR(20))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        nullable=True, onupdate=datetime.utcnow)
    birthday_at = Column(DateTime)

    # creating 创建中的账号，如生成了验证码，但是没有校验
    # available 有效账号
    status = Column(VARCHAR(10))
    valcode = Column(CHAR(6))
    # 0:admin; 1general
    level = Column(SMALLINT, default=1)

class ProductKeyword(BaseModel):
    __tablename__ = 'productkeyword'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30), nullable=False)
    theme = Column(VARCHAR(80))
    source = Column(VARCHAR(50))
    ori_price = Column(FLOAT)
    con_price = Column(FLOAT)
    postage_price = Column(FLOAT)
    count_down_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    description = Column(VARCHAR(100))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        nullable=True, onupdate=datetime.utcnow)

class Product(BaseModel):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30))
    theme = Column(VARCHAR(80))
    source = Column(VARCHAR(50))
    ori_price = Column(FLOAT)
    con_price = Column(FLOAT)
    postage_price = Column(FLOAT)
    count_down_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    description = Column(VARCHAR(100))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        nullable=True, onupdate=datetime.utcnow)

class Like(BaseModel):
    __tablename__ = 'like'
    id = Column(Integer, primary_key=True)
    user_name = Column(VARCHAR(30), nullable=False)
    keyword_id = Column(Integer)
    product_id = Column(Integer)


def get_product_pu(suffix_name):
    class Product_PU(DynamicDModel):
        __tablename__ = "product_pu_%s"%suffix_name
        mysql_engine='InnoDB'
        id = Column(Integer, primary_key=True)
        ip = Column(VARCHAR(30))
        html = Column(VARCHAR(20))
        product_id = Column(CHAR(36))
        product_name = Column(CHAR(30))
        pu_count = Column(Integer)
    return Product_PU


def register_db():
    engine = get_engine()
    BaseModel.metadata.create_all(engine)


def unregister_db():
    engine = get_engine()
    BaseModel.metadata.drop_all(engine)


