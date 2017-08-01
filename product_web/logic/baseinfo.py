#!/usr/bin/python
# -*- coding: utf-8 -*-
from db.base import get_session, get_engine
from db import api
from common.log_client import gen_log

def get_company():
    try:
        session = get_session()
        query = api.model_query(session, "Company", {})
        _ = query.first()
        return _.to_dict()
    except Exception as ex:
        gen_log.error("get all company error:%r"%ex)
    finally:
        session.close()

def update_company(company_info, company_name):
    try:
        session = get_session()
        query = api.model_query(session, "User", {"name": [company_name]})
        query.update(company_info, synchronize_session=False)
        session.commit()
        return True
    except Exception as ex:
        gen_log.error("update company error:%r" % ex)
        return False
    finally:
        session.close()
