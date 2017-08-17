
import smtplib
import threading
from email.mime.text import MIMEText
import time

#gmail_email_user = "customerservice@amazfree.com"
gmail_email_user = "imzihuang@gmail.com"
#gmail_email_pwd = "songbaorui"
gmail_email_pwd = "lin87786995"
def gmail_send_email(to_email, message, subject):
    try:
        msg = MIMEText(message)
        msg['From'] = gmail_email_user
        msg['To'] = to_email
        msg['Subject'] = subject
        service_smtp = smtplib.SMTP('smtp.gmail.com', 587)
    except Exception as e:
        print "send email error connect:%r" % e
        return False

    try:
        service_smtp.starttls()
        service_smtp.login(gmail_email_user, gmail_email_pwd)
        service_smtp.sendmail(gmail_email_user, to_email, msg.as_string())
        return True
    except smtplib.SMTPException, e:
        print "send email error 01:%r" % e
        return False
    except Exception, e:
        print "send email error 02:%r" % e
        return False
    finally:
        service_smtp.quit()


if __name__ == "__main__":
    print "begin------------------%s"%time.time()
    gmail_send_email("316191270@qq.com", "hello word 111", "test nihao")
    print "end------------------%s"%time.time()