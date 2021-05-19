import { observable, action } from "mobx";

class RootStore {
  // observable 表示数据可监控 表示是全局数据
  // 手机号码
  @observable mobile = '';
  // @observable mobile = '15915912345';
  // token
  @observable token = '';
  // @observable token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjMsIm5hbWUiOiIxNTkxNTkxMjM0NSIsImlhdCI6MTYyMDc0MTM0NiwiZXhwIjoxNjQ2NjYxMzQ2fQ.m4jic3MXeFUJxYAeoZZxv57ziJ-ZWGtCiWaGeoe73fw';
  // 用户唯一 id
  @observable userId = '';
  // @observable userId = '159159123451591501526289';
  // action行为 表示 changeName是个可以修改全局共享数据的方法
  @action setUserInfo(mobile, token, userId) {
    this.mobile = mobile;
    this.token = token;
    this.userId = userId;
  }
}

export default new RootStore();