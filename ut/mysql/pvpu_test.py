import unittest
from logic import pvpu

class SqlTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def test_pu_add(self):
        _ = pvpu.pu_add("ip", "html", "product_id", "product_name")
        self.assertTrue(_>0)



if __name__ == '__main__':
    unittest.main()