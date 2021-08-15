## 探花交友 - 项目

![pink flowers](https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-dbee60e1-d21d-445e-8306-6587e42256f2.jpg)



### 项目启动

#### 环境配置

Android：[mac 多端 android 环境配置](https://juejin.cn/post/6913854134915432456)(目前开发过程中只测试了 Android)

IOS: [mac 多端 ios 环境配置](https://juejin.cn/post/6913861419809112077)

#### 启动命令

启动 `Metro` 服务对 `js` 代码进行实时打包处理（类似 webpack）

```zsh
npm run start
```

对项目的原生部分进行编译

```zsh
npm run android
```



### 项目模块

交友、圈子、消息、我的

<div align="center">
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-63048679-9379-41b3-90fc-a298ed9a97bb.png" alt="friend" height="330" width="190" >
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-947efbbf-7991-4371-a888-0fca009bc8a5.png" alt="group" height="330" width="190" >
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-13eb1494-bc35-436b-a544-e34f5465b296.png" alt="message" height="330" width="190" >
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-4b44a0a7-f4a7-41d6-a972-3a0dc5f76eb9.png" alt="my" height="330" width="190" >
</div>


搜附近、测灵魂、发布动态、退出登录

<div align="center">
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-4f810564-ac3b-4656-a699-a4ba7dd5001a.png" alt="near" height="330" width="190" >
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-42e946e5-e556-4402-9d83-6064891c4970.png" alt="soul" height="330" width="190" >
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-0fb5c9f5-59f8-4dd0-8cc9-abdf8fcd4fa5.png" alt="publish" height="330" width="190" >
  <img src="https://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/file-ba020042-98ae-44be-b05d-d36f14fde094.png" alt="logout" height="330" width="190" >
</div>


### 项目实现

#### 项目初始化

```js
npx react-native init exploreFlowers
```

[接口线上文档](http://157.122.54.189:9089/swagger.html)

#### 第三方库

页面路由：[react-navigation](https://reactnavigation.org/) 、[react-native-tab-navigator](https://www.npmjs.com/package/react-native-tab-navigator)

数据存储：[mobx](https://cn.mobx.js.org/)

##### 组件库

组件库：[react-native-elements](https://www.npmjs.com/package/react-native-elements)、[Teaset](https://github.com/rilyu/teaset/blob/HEAD/docs/cn/README.md)

DataPicker：[react-native-datepicker](https://www.npmjs.com/package/react-native-datepicker)

Icon：[react-native-vector-icons](react-native-vector-icons/FontAwesome5)

IconSvg：[react-native-svg-uri](https://www.npmjs.com/package/react-native-svg-uri)

ImageCrop：[react-native-image-crop-picker](https://www.npmjs.com/package/react-native-image-crop-picker)

ImageViewer：[react-native-image-zoom-viewer](https://www.npmjs.com/package/react-native-image-zoom-viewer)

ImagePicker：[react-native-image-picker](https://github.com/react-native-community/react-native-image-picker)

Swpier：[react-native-deck-swiper](https://www.npmjs.com/package/react-native-deck-swiper)

Pick：[react-native-picker](https://www.npmjs.com/package/react-native-picker)

Tabs：[react-native-scrollable-tab-view](https://www.npmjs.com/package/react-native-scrollable-tab-view) 



渐变颜色：[react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient)

验证码： [react-native-confirmation-code-field](https://www.npmjs.com/package/react-native-confirmation-code-field)

顶部图片吸顶：[react-native-image-header-scroll-view](https://www.npmjs.com/package/react-native-image-header-scroll-view)



聊天界面：[aurora-imui-react-native](https://github.com/jpush/aurora-imui/blob/master/README_zh.md)

日期方法库：[moment.js](http://momentjs.cn) 

#### 应用库

极光通讯：[JMessage](https://www.npmjs.com/package/jmessage-react-plugin)

高德地图定位: [react-native-amap-geolocation](https://www.npmjs.com/package/react-native-amap-geolocation)

