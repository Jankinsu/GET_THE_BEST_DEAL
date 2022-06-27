# 本脚本查询宿舍电费，仅此而已

import re
import requests

login_url = ''
check_url = ''


class Energy_Check:
    def __init__(self, username: str, password: str):
        self.u = username
        self.p = password
        self.s = requests.Session()
        self.s.headers.update({})

    def _login(self):
        pass

    def check(self):
        pass


username = ''
password = '123456'


def main():
    energy = Energy_Check(username, password)
    energy.check()


if __name__ == '__main__':
    main()
