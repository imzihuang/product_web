#!/usr/bin/python
# -*- coding: UTF-8 -*-

import smtplib
from email.mime.text import MIMEText
from common.log_client import gen_log
from common.ini_client import ini_load
import threading

_LOCK = threading.Lock()

_conf=ini_load('config/email.ini')
qq_dic_con=_conf.get_fields('qq')

qq_email_user = qq_dic_con.get("email_user")
qq_email_pwd  = qq_dic_con.get("email_pwd")


def qq_send_email(to_email, message, subject):
    """
    发送邮件
    :param to_email: 接收邮箱
    :param message: 发送内容
    :param subject: 邮件标题
    :return:
    """
    global _LOCK
    with _LOCK:
        try:
            service_smtp = smtplib.SMTP_SSL("smtp.qq.com", 465)
            msg = MIMEText(message, 'html')
            msg["Subject"] = subject
            msg["From"] = qq_email_user
            msg["To"] = to_email
            service_smtp.login(qq_email_user, qq_email_pwd)
            service_smtp.sendmail(qq_email_user, to_email, msg.as_string())
            return True
        except smtplib.SMTPException, e:
            gen_log.error("send email error:%r"%e)
            return False
        finally:
            service_smtp.quit()


"""smtp-mail.outlook.com"""
hot_dic_con=_conf.get_fields('hotmail')
hot_email_user = hot_dic_con.get("email_user")
hot_email_pwd  = hot_dic_con.get("email_pwd")
def hot_send_email(to_email, message, subject):
    global _LOCK
    with _LOCK:
        try:
            #service_smtp = smtplib.SMTP("smtp-mail.outlook.com", 587)
            service_smtp = smtplib.SMTP("smtp.live.com",587)
            msg = MIMEText(message, 'html')
            msg["Subject"] = subject
            msg["From"] = hot_email_user
            msg["To"] = to_email
            service_smtp.ehlo() # Hostname to send for this command defaults to the fully qualified domain name of the local host.
            service_smtp.starttls() #Puts connection to SMTP server in TLS mode
            service_smtp.ehlo()
            service_smtp.login(hot_email_user, hot_email_pwd)
            service_smtp.sendmail(hot_email_user, to_email, msg.as_string())
            return True
        except smtplib.SMTPException, e:
            gen_log.error("send email error:%r" % e)
            return False
        finally:
            service_smtp.quit()





