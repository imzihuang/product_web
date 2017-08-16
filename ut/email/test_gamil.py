
import smtplib
import threading
from email.mime.text import MIMEText

_LOCK = threading.Lock()

gmail_email_user = "customerservice@amazfree.com"
gmail_email_pwd = "songbaorui"
def gmail_send_email(to_email, message, subject):

    try:
        service_smtp = smtplib.SMTP()
        service_smtp.connect('smtp.gmail.com', 25)
    except Exception as e:
        print "send email error:%r" % e
        return False

    try:
        service_smtp.starttls()
        service_smtp.login(gmail_email_user, gmail_email_pwd)
        msg = MIMEText(message)
        msg['From'] = gmail_email_user
        msg['To'] = to_email
        msg['Subject'] = subject
        service_smtp.sendmail(gmail_email_user, to_email, msg.as_string())
        return True
    except smtplib.SMTPException, e:
        print "send email error:%r" % e
        return False
    except Exception, e:
        print "send email error:%r" % e
        return False
    finally:
        service_smtp.quit()


if __name__ == "__main__":
    gmail_send_email("316191270@qq.com", "hello word", "test")