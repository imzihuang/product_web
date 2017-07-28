import unittest
from logic.keyword import *

class SqlTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def test_keywod(self):
        data = {
            "name": "trest111",
            "source": "by jingdong",
            "theme": "dddddddd",
            "ori_price": 20,
            "con_price": 10,
            "postage_price": 0,
            "description": "helo",
            "links": "http://www.cnblogs.com/fuckily/p/6393413.html",
            "img_path": "img_path"
        }
        _ = add_keyword(data)
        print _
        self.assertTrue(_ is not None)
        _ = get_keyword(name="trest111")
        print _
        self.assertTrue(_ is not None)
        _ = update_keyword({"source": "by amazon", "count_down_at": "2017-07-28 12:07:01"}, {"name": ["trest111"]})
        self.assertTrue(_)
        _ = get_keyword(name="trest111")
        print _
        self.assertTrue(_ is not None)
        _ = del_keyword("trest111")
        print _
        self.assertTrue(_)

if __name__ == '__main__':
    unittest.main()
