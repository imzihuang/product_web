#!/usr/bin/python
# -*- coding: utf-8 -*-
from sqlalchemy import Column, Table, MetaData

from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from base import get_engine

BaseModel = declarative_base()
DynamicDModel = declarative_base()

class User(BaseModel):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30), nullable=False)
    pwd = Column(VARCHAR(50), nullable=False)
    reset_pwd = Column(VARCHAR(50))
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
    # 0:admin; 1:general
    level = Column(SMALLINT, default=1)
    img_path = Column(VARCHAR(50))

    def to_dict(self):
       return {c.name: getattr(self, c.name, None).strftime('%Y-%m-%d %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}


class ProductKeyword(BaseModel):
    __tablename__ = 'productkeyword'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30), nullable=False)
    theme = Column(VARCHAR(80))
    source = Column(VARCHAR(50))
    ori_price = Column(FLOAT)
    con_price = Column(FLOAT)
    postage_price = Column(FLOAT)
    description = Column(VARCHAR(100))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        nullable=True, onupdate=datetime.utcnow)
    count_down_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    like_add_count = Column(Integer, default=0)
    sort_num = Column(Integer, default=10000)
    img_path = Column(VARCHAR(50))
    recommend = Column(BOOLEAN, default=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None).strftime('%m/%d/%Y %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}

       #return {c.name: getattr(self, c.name, None).strftime('%Y-%m-%d %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}


class Product(BaseModel):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30))
    theme = Column(VARCHAR(80))
    source = Column(VARCHAR(50))
    ori_price = Column(FLOAT)
    con_price = Column(FLOAT)
    postage_price = Column(FLOAT)
    description = Column(VARCHAR(100))
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        nullable=True, onupdate=datetime.utcnow)
    count_down_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    links = Column(VARCHAR(50))
    like_add_count = Column(Integer, default=0)
    sort_num = Column(Integer, default=10000)
    img_path = Column(VARCHAR(50))
    recommend = Column(BOOLEAN, default=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None).strftime('%m/%d/%Y %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}

        #return {c.name: getattr(self, c.name, None).strftime('%Y-%m-%d %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}


class Company(BaseModel):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    name = Column(VARCHAR(30))
    email = Column(VARCHAR(50))
    telephone = Column(VARCHAR(20))
    address = Column(VARCHAR(100))
    country = Column(VARCHAR(20))
    province = Column(VARCHAR(20))
    city = Column(VARCHAR(20))
    description = Column(VARCHAR(200))
    updated_at = Column(DateTime, default=datetime.utcnow,
                        nullable=True, onupdate=datetime.utcnow)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None).strftime('%Y-%m-%d %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}



class Like(BaseModel):
    __tablename__ = 'like'
    id = Column(Integer, primary_key=True)
    user_name = Column(VARCHAR(30), nullable=False)
    keyword_id = Column(Integer)
    product_id = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None).strftime('%Y-%m-%d %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}

class Product_PV(BaseModel):
    __tablename__ = "product_pv"
    id = Column(Integer, primary_key=True)
    ip = Column(VARCHAR(30))
    html = Column(VARCHAR(20))
    product_id = Column(CHAR(36))
    product_name = Column(CHAR(30))
    visit_date = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None).strftime('%Y-%m-%d %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}


class Product_PU(BaseModel):
    __tablename__ = "product_pu"
    mysql_engine = 'InnoDB'
    id = Column(Integer, primary_key=True)
    ip = Column(VARCHAR(30))
    html = Column(VARCHAR(20))
    product_id = Column(CHAR(36))
    product_name = Column(CHAR(30))
    pu_count = Column(Integer)
    visit_date = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {c.name: getattr(self, c.name, None).strftime('%Y-%m-%d %H:%M:%S') if isinstance(getattr(self, c.name, None), datetime) else getattr(self, c.name, None) for c in self.__table__.columns}


def register_db():
    engine = get_engine()
    BaseModel.metadata.create_all(engine)


def unregister_db():
    engine = get_engine()
    BaseModel.metadata.drop_all(engine)


