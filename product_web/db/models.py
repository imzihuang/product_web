#!/usr/bin/python
# -*- coding: utf-8 -*-
from sqlalchemy import Column, Table, MetaData

from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import uuid
from common.convert import utcnow
from base import get_engine

BaseModel = declarative_base()
DynamicDModel = declarative_base()

class User(BaseModel):
    __tablename__ = 'user'
    id = Column(CHAR(36), primary_key=True,
                default=lambda: str(uuid.uuid4()))
    name = Column(VARCHAR(30))
    pwd = Column(VARCHAR(20), default='888888', nullable=False)
    iage = Column(SMALLINT(), server_default='20')
    email = Column(VARCHAR(50))
    ip = Column(VARCHAR(50))
    created_at = Column(DateTime, default=lambda: utcnow(),nullable=False)
    updated_at = Column(DateTime, default=lambda: utcnow(),
                        nullable=True, onupdate=lambda: utcnow())
    birthday_at = Column(DateTime)
    remark = Column(CHAR(100))

class ProductType(BaseModel):
    __tablename__ = 'producttype'
    id = Column(CHAR(36), primary_key=True,
                default=lambda: str(uuid.uuid4()))
    name = Column(VARCHAR(30))
    description = Column(VARCHAR(100))
    created_at = Column(DateTime, default=lambda: utcnow(),nullable=False)
    updated_at = Column(DateTime, default=lambda: utcnow(),
                        nullable=True, onupdate=lambda: utcnow())

class Product(BaseModel):
    __tablename__ = 'product'
    id = Column(CHAR(36), primary_key=True,
                default=lambda: str(uuid.uuid4()))
    name = Column(VARCHAR(30))
    type_id = Column(CHAR(36))
    description = Column(VARCHAR(100))
    created_at = Column(DateTime, default=lambda: utcnow(),nullable=False)
    updated_at = Column(DateTime, default=lambda: utcnow(),
                        nullable=True, onupdate=lambda: utcnow())
    product_type=relationship(ProductType, backref="product",
                          foreign_keys=type_id,
                          primaryjoin='Product.type_id == ProductType.id')



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


