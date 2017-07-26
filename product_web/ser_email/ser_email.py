#!/usr/bin/python
# -*- coding: UTF-8 -*-

import smtplib
from email.mime.text import MIMEText
from common.log_client import gen_log
from common.ini_client import ini_load

_conf=ini_load('config/email.ini')
_dic_con=_conf.get_fields('qq')

email_user = _dic_con.get("email_user")
email_pwd  = _dic_con.get("email_pwd")


def send_email(to_email, message, subject):
    """
    发送邮件
    :param to_email: 接收邮箱
    :param message: 发送内容
    :param subject: 邮件标题
    :return:
    """
    try:
        service_smtp = smtplib.SMTP_SSL("smtp.qq.com", 465)
        msg = MIMEText(message)
        msg["Subject"] = subject
        msg["From"] = email_user
        msg["To"] = to_email
        service_smtp.login(email_user, email_pwd)
        service_smtp.sendmail(email_user, to_email, msg.as_string())
        return True
    except smtplib.SMTPException, e:
        gen_log.error("send email error:%r"%e)
        return False
    finally:
        service_smtp.quit()




