import { PermissionsAndroid, Platform } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";
import axios from "axios";

class Geo {
  // 初始化
  async initGeo() {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
    await init({
      // 高德地图 Android 应用对应的 key
      // study key
      ios: "e8b092f4b23cef186bd1c4fdd975bf38",
      android: "e8b092f4b23cef186bd1c4fdd975bf38"

      // owner key
      // ios: "35d3f709889c14e78eadf242da3078b6",
      // android: "35d3f709889c14e78eadf242da3078b6"
    });
    return Promise.resolve();
  }

  // 获取当前地理位置信息
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      console.log("开始定位");
      Geolocation.getCurrentPosition(({ coords }) => {
        resolve(coords);
      }, reject);
    })
  }

  // 通过地理位置信息经纬度信息调用高德api获取对应的位置详情信息
  async getCityByLocation() {
    const { longitude, latitude } = await this.getCurrentPosition();
    const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
      // 高德地图 Web 端应用对应的 key
      // study key
      params: { location: `${longitude},${latitude}`, key: "83e9dd6dfc3ad5925fc228c14eb3b4d6", }

      // owner key
      // params: { location: `${longitude},${latitude}`, key: "6638e3c59bb2f26de508be07f7f5a061", }
    });
    return Promise.resolve(res.data);
  }
}


export default new Geo();