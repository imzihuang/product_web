#!/usr/bin/python
# -*- coding: utf-8 -*-

import datetime
from common.log_client import gen_log
from db.base import get_session, get_engine
from db import api, models

def get_pu(ip, html, query_date):
    pass

def get_pv(ip="", html=""):
    try:
        session = get_session()
        query = api.get_pv_count(ip, html)
        results = query.all()
        return [result.to_dict() for result in results]
    except Exception as ex:
        gen_log.error("pu query error:%r"%ex)
        return 0
    finally:
        session.close()

def pu_add(ip, html, product_id="", product_name=""):
    try:
        session = get_session()
        current_month = datetime.datetime.now().strftime('%Y-%m')+"-00 00:00:00"
        query = api.model_query(session, "Product_PU", {"ip": [ip], "html": [html], "visit_date": [current_month]})
        if query.count() == 0:
            data = {
                "ip": ip,
                "html": html,
                "product_id": product_id,
                "product_name": product_name,
                "pu_count": 1,
                "visit_date": current_month
            }
            data = api.convert_model("Product_PU", data)
            session.add(data)
        else:
            current_pu = query.first()
            current_pu.pu_count += 1
            #query.update({
            #    models.Product_PU.pu_count: current_pu.pu_count +1
            #})
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("pu add error:%r" % ex)
        return False
    finally:
        session.close()

def pv_add(ip, html, product_id="", product_name=""):
    try:
        session = get_session()
        current_date = datetime.datetime.now().strftime('%Y-%m-%d')+ " 00:00:00"
        gen_log.info("----------------current_date:%s"%current_date)
        query = api.model_query(session, "Product_PV", {"ip": [ip], "html": [html], "visit_date": [current_date]})
        if query.count() > 0:
            return False
        data = {
            "ip": ip,
            "html": html,
            "product_id": product_id,
            "product_name": product_name,
            "visit_date": current_date
        }
        data = api.convert_model("Product_PV", data)
        session.add(data)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("pv error:%r"%ex)
        return False
    finally:
        session.close()


