import { observable, action } from "mobx";

class UserStore {
  @observable user = {
    // "Distance": 9666804.2,
    // "address": "fjdskjfdvdksjkfkjksjkcjdkjvk",
    // "age": 23,
    // "amount": null,
    // "birthday": "1995-03-03T16:00:00.000Z",
    // "city": "天津",
    // "email": null,
    // "gender": "男",
    // "guid": "186657119781591501526289",
    // "header": "/upload/162151615708018665711978.jpg",
    // "id": 7,
    // "lat": 110,
    // "lng": 110,
    // "login_time": "2021-05-31T11:48:51.000Z",
    // "marry": "单身",
    // "mobile": "18665711978",
    // "nick_name": "admin",
    // "status": 0,
    // "vcode": "888888",
    // "xueli": "本科",
  };

  // 设置用户信息
  @action setUser(user) {
    this.user = user;
  };

  // 清除用户信息
  @action clearUser() {
    this.user = {};
  }
}

export default new UserStore();