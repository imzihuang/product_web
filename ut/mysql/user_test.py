import unittest
from db import api
from logic.user import *

class SqlTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def test_user(self):
        userinfo = {
            "name": "ut_test",
            "pwd": "123456",
            "age": 18,
            "email": "test@qq.com",
            "status": "available"
        }
        _ = add_user(userinfo)
        _ = get_available_user({"name": "ut_test"})
        self.assertTrue(_ is not None)
        _ = del_user("ut_test")
        self.assertTrue(_)

if __name__ == '__main__':
    unittest.main()
