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
        engine = get_engine()
        session = get_session()
        suffix_name = datetime.datetime.now().strftime('%Y%m')
        Product_PU = models.get_product_pu(suffix_name)
        Product_PU.metadata.create_all(engine)
        query = session.query(Product_PU.pu_count)
        query = query.filter(Product_PU.ip == ip and Product_PU.html == html and Product_PU.product_id == product_id)
        result = query.first()
        pu_count = 1
        if not result:
            result = Product_PU()
            setattr(result, "ip", ip)
            setattr(result, "html", html)
            setattr(result, "product_id", product_id)
            setattr(result, "product_name", product_name)
            setattr(result, "pu_count", pu_count)
            session.add(result)
        else:
            pu_count = result[0] + 1
            query.update({
                Product_PU.pu_count: pu_count
            })
        session.commit()
        return pu_count
    except Exception as ex:
        gen_log.error("pu add error:%r"%ex)
        return 0
    finally:
        session.close()

def pv_add(ip, html, product_id="", product_name=""):
    try:
        session = get_session()
        current_date = datetime.datetime.now().strftime('%Y%m%d')
        query = api.model_query(session, "Product_PV", {"ip": [ip], "visit_date": [current_date]})
        if query.count() > 0:
            return 0
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
        return 1
    except Exception as ex:
        gen_log.error("pv error:%r"%ex)
        return 0
    finally:
        session.close()


