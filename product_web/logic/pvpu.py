#!/usr/bin/python
# -*- coding: utf-8 -*-

import datetime
from common.log_client import gen_log
from db.base import get_session, get_engine
from db import api, models

def pu_add(ip, html, product_id, product_name):
    engine = get_engine()
    session = get_session()
    suffix_name = datetime.datetime.now().strftime('%Y%m')
    Product_PU = models.get_product_pu(suffix_name)
    try:
        Product_PU.metadata.create_all(engine)
        query = session.query(Product_PU.pu_count)
        query = query.filter(Product_PU.ip == ip and Product_PU.html==html and Product_PU.product_id==product_id)
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