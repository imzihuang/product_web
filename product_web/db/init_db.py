# coding:utf-8

from models import register_db
from api import convert_model
from base import get_session
from common.encrypt_md5 import encry_md5
from common.ini_client import ini_load

_conf = ini_load('config/commin.ini')
_dic_base = _conf.get_fields('base_info')

def add_user(admin_userinfo):
    try:
        session = get_session()
        model_user = convert_model("User", admin_userinfo)
        session.add(model_user)
        session.commit()
        return True
    except Exception as ex:
        raise ex
    finally:
        session.close()

def add_company(companyinfo):
    try:
        session = get_session()
        model_company = convert_model("Company", companyinfo)
        session.add(model_company)
        session.commit()
        return True
    except Exception as ex:
        raise ex
    finally:
        session.close()

if __name__ == "__main__":
    register_db()
    add_user({
        "name": "admin",
        "email": "A99dealservice@outlook.com",
        "pwd": encry_md5("ewixqqssssss3$#@s"),
        "status": "available",
        "level": 0
    })

    add_company(_dic_base)
