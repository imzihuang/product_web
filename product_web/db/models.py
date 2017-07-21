#!/usr/bin/python
# -*- coding: utf-8 -*-
from sqlalchemy import Column, String
from sqlalchemy.types import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

BaseModel = declarative_base()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from common.convert import utcnow


engine = create_engine('mysql://root:Hs2BitqLYKoruZjb18SV@localhost/productdb')
DBSession = sessionmaker(bind=engine)


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

def register_db():
    BaseModel.metadata.create_all(engine)


def unregister_db():
    BaseModel.metadata.drop_all(engine)


