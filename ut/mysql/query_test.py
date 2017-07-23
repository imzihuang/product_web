import unittest
from db import api

class SqlTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def test_pu_add(self):
        _ = api.pu_add()



if __name__ == '__main__':
    unittest.main()