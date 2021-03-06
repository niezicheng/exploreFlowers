import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import IMUI from 'aurora-imui-react-native';
// import RNFS from 'react-native-fs'; // 文件操作库
import { inject, observer } from 'mobx-react';
import { BASE_URI } from '../../../utils/pathMap';
import JMessage from '../../../utils/JMessage';
import NavHeader from '../../../components/NavHeader';

// 聊天输入框组件
var InputView = IMUI.ChatInput;
// 信息展示列表
var MessageListView = IMUI.MessageList;
// 总的控制中心
const AuroraIController = IMUI.AuroraIMUIController;
const window = Dimensions.get('window');


var themsgid = 1

// 创建各种类型消息函数
function constructNormalMessage() {
  // 创建一个消息对象
  const message = {};
  message.msgId = themsgid.toString();
  themsgid += 1;
  // 标识消息的当前状态 => 发送完成(图片等大资源信息是否发送完成)
  message.status = "send_succeed";
  // 当前消息是发送还是接受
  // 接受者:
  //               发送者:
  message.isOutgoing = true;
  message.timeString = "";
  message.fromUser = {
    userId: "",
    displayName: "",
    avatarPath: ""
  };
  // if (Platform.OS === "ios") {
  //   user.avatarPath = RNFS.MainBundlePath + '/default_header.png'
  // }

  return message;
};

@inject('UserStore')
@observer
export default class TestRNIMUI extends Component {
  constructor(props) {
    super(props);
    let initHeight;
    if (Platform.OS === "ios") {
      initHeight = 46
    } else {
      initHeight = 100
    }
    this.state = {
      inputLayoutHeight: initHeight,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { width: window.width, height: initHeight, },
      isAllowPullToRefresh: true,
      navigationBar: {},
    }

    this.updateLayout = this.updateLayout.bind(this);
    this.onMsgClick = this.onMsgClick.bind(this);
    this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);
  }

  componentDidMount() {
    /**
     * Android only
     * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
     * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
     */
    if (Platform.OS === "android") {
      this.refs["ChatInput"].setMenuContainerHeight(316)
    }
    this.resetMenu()
    AuroraIController.addMessageListDidLoadListener(this.messageListDidLoadEvent);
  }

  messageListDidLoadEvent() {
    this.getHistoryMessage()
  }

  // 获取历史消息
  getHistoryMessage = async () => {
    const username = this.props.route.params.guid;
    const from = 1;
    const limit = 1000;
    // 获取极光历史消息
    const history = await JMessage.getHistoryMessages(username, from, limit);
    // console.log(history);
    // 消息数组
    var messages = [];
    history.forEach(v => {
      // 创建一个消息对象
      var message = constructNormalMessage();
      // 设置用户相关头像
      // 发送者 this.props.UserStore.user.header
      // 接受者头像 this.props.route.params.header
      // 判断发送者和接受者(获取消息对象中属性 form.username 等于当前登录用户 guid)
      if (v.from.username === this.props.UserStore.user.guid) {
        // 当前消息是属于发送者的
        message.isOutgoing = true;
        message.fromUser.avatarPath = `${BASE_URI}${this.props.UserStore.user.header}` || "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926548887&di=f107f4f8bd50fada6c5770ef27535277&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F67%2F23%2F69i58PICP37.jpg";
      } else {
        message.isOutgoing = false;
        message.fromUser.avatarPath = `${BASE_URI}${this.props.route.params.header}` || "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926548887&di=f107f4f8bd50fada6c5770ef27535277&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F67%2F23%2F69i58PICP37.jpg";
      }
      if (v.type === 'text') {
        // 但前消息展示的类型
        message.msgType = 'text';
        // 设置消息内容
        message.text = v.text;
      } else if (v.type === 'image') {
        // 但前消息展示的类型
        message.msgType = 'image';
        // 图片路径
        message.mediaPath = v.thumbPath;
      }

      // 带上发送的时间
      message.timeString = (new Date(v.createTime)).toLocaleTimeString();
      // 聊天信息气泡大小
      message.contentSize = { 'height': 100, 'width': 200 };
      // 额外数据
      // message.extras = { "extras": "fdfsf" };
      messages.push(message);
    });
    AuroraIController.appendMessages(messages)
    AuroraIController.scrollToBottom(true)
  }

  onInputViewSizeChange = (size) => {
    console.log("onInputViewSizeChange height: " + size.height + " width: " + size.width)
    if (this.state.inputLayoutHeight != size.height) {
      this.setState({
        inputLayoutHeight: size.height,
        inputViewLayout: { width: window.width, height: size.height },
        messageListLayout: { flex: 1, width: window.width, margin: 0 }
      })
    }
  }

  componentWillUnmount() {
    AuroraIController.removeMessageListDidLoadListener(this.messageListDidLoadEvent)
  }

  resetMenu() {
    if (Platform.OS === "android") {
      this.refs["ChatInput"].showMenu(false)
      this.setState({
        messageListLayout: { flex: 1, width: window.width, margin: 0 },
        navigationBar: { height: 64, justifyContent: 'center' },
      })
      this.forceUpdate();
    } else {
      AuroraIController.hidenFeatureView(true)
    }
  }

  /**
   * Android need this event to invoke onSizeChanged 
   */
  onTouchEditText = () => {
    this.refs["ChatInput"].showMenu(false)
  }

  onFullScreen = () => {
    console.log("on full screen")
    this.setState({
      messageListLayout: { flex: 0, width: 0, height: 0 },
      inputViewLayout: { flex: 1, width: window.width, height: window.height },
      navigationBar: { height: 0 }
    })
  }

  onRecoverScreen = () => {
    // this.setState({
    //   inputLayoutHeight: 100,
    //   messageListLayout: { flex: 1, width: window.width, margin: 0 },
    //   inputViewLayout: { flex: 0, width: window.width, height: 100 },
    //   navigationBar: { height: 64, justifyContent: 'center' }
    // })
  }

  onAvatarClick = (message) => {
    Alert.alert()
    AuroraIController.removeMessage(message.msgId)
  }

  onMsgClick(message) {
    console.log(message)
    Alert.alert("message", JSON.stringify(message))
  }

  onMsgLongClick = (message) => {
    Alert.alert('message bubble on long press', 'message bubble on long press')
  }

  onStatusViewClick = (message) => {
    message.status = 'send_succeed'
    AuroraIController.updateMessage(message)
  }

  onBeginDragMessageList = () => {
    this.resetMenu()
    AuroraIController.hidenFeatureView(true)
  }

  onTouchMsgList = () => {
    AuroraIController.hidenFeatureView(true)
  }

  onPullToRefresh = () => {
    console.log("on pull to refresh")
    var messages = []
    for (var i = 0; i < 14; i++) {
      var message = constructNormalMessage()
      // if (index%2 == 0) {
      message.msgType = "text"
      message.text = "" + i
      // }

      if (i % 3 == 0) {
        message.msgType = "video"
        message.text = "" + i
        message.mediaPath = "/storage/emulated/0/ScreenRecorder/screenrecorder.20180323101705.mp4"
        message.duration = 12
      }
      messages.push(message)
    }
    AuroraIController.insertMessagesToTop(messages)
    if (Platform.OS === 'android') {
      this.refs["MessageList"].refreshComplete()
    }

  }

  // 发送文本消息
  onSendText = async (text) => {
    const message = constructNormalMessage();

    message.msgType = 'text';
    message.text = text;
    message.fromUser.avatarPath = `${BASE_URI}${this.props.UserStore.user.header}` || "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534926548887&di=f107f4f8bd50fada6c5770ef27535277&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F67%2F23%2F69i58PICP37.jpg";

    AuroraIController.appendMessages([message]);
    // 极光发送文本
    const username = this.props.route.params.guid;
    const extras = { user: JSON.stringify(this.props.UserStore.user) }
    const res = await JMessage.sendTextMessage(username, text, extras);

    // console.log(res, 'resText-=-=-===-=-==');
  }

  onTakePicture = (media) => {
    console.log("media " + JSON.stringify(media))
    var message = constructNormalMessage()
    message.msgType = 'image'
    message.mediaPath = media.mediaPath
    AuroraIController.appendMessages([message])
    this.resetMenu()
    AuroraIController.scrollToBottom(true)
  }

  onStartRecordVoice = (e) => {
    console.log("on start record voice")
  }

  onFinishRecordVoice = (mediaPath, duration) => {
    var message = constructNormalMessage()
    message.msgType = "voice"
    message.mediaPath = mediaPath
    message.timeString = "safsdfa"
    message.duration = duration
    AuroraIController.appendMessages([message])
    console.log("on finish record voice")
  }

  onCancelRecordVoice = () => {
    console.log("on cancel record voice")
  }

  onStartRecordVideo = () => {
    console.log("on start record video")
  }

  onFinishRecordVideo = (video) => {
    // var message = constructNormalMessage()

    // message.msgType = "video"
    // message.mediaPath = video.mediaPath
    // message.duration = video.duration
    // AuroraIController.appendMessages([message])
  }

  // 发送文件或图片消息
  onSendGalleryFiles = (mediaFiles) => {
    mediaFiles.forEach(async (v) => {
      // 创建一个消息对象
      var message = constructNormalMessage()
      // 判断当前文件类型
      if (v.mediaType == "image") {
        message.msgType = "image";
      }
      // } else {
      //   message.msgType = "video";
      //   message.duration = v.duration;
      // }

      message.mediaPath = v.mediaPath;
      // 设置消息状态 => 发送中
      message.status = "send_going";
      AuroraIController.appendMessages([message]);
      AuroraIController.scrollToBottom(true);

      // 调用极光发送图片 api
      const username = this.props.route.params.guid;
      const path = v.mediaPath;
      const extras = { user: JSON.stringify(this.props.UserStore.user) }
      // const res = await JMessage.sendImageMessage(username, path, extras);
      await JMessage.sendImageMessage(username, path, extras);
      // console.log(res, '-=-=-=-===-=res')
      // 修改发送状态 发送中 => 发送完成
      AuroraIController.updateMessage({ ...message, status: 'send_success' })
    });

    this.resetMenu()
  }

  onSwitchToMicrophoneMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onSwitchToEmojiMode = () => {
    AuroraIController.scrollToBottom(true)
  }
  onSwitchToGalleryMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onSwitchToCameraMode = () => {
    AuroraIController.scrollToBottom(true)
  }

  onShowKeyboard = (keyboard_height) => {
  }

  updateLayout(layout) {
    this.setState({ inputViewLayout: layout })
  }

  onInitPress() {
    console.log('on click init push ');
    this.updateAction();
  }

  onClickSelectAlbum = () => {
    console.log("on click select album")
  }

  onCloseCamera = () => {
    console.log("On close camera event")
    this.setState({
      inputLayoutHeight: 100,
      messageListLayout: { flex: 1, width: window.width, margin: 0 },
      inputViewLayout: { flex: 0, width: window.width, height: 100 },
      navigationBar: { height: 64, justifyContent: 'center' }
    })
  }

  /**
   * Switch to record video mode or not
   */
  switchCameraMode = (isRecordVideoMode) => {
    console.log("Switching camera mode: isRecordVideoMode: " + isRecordVideoMode)
    // If record video mode, then set to full screen.
    if (isRecordVideoMode) {
      this.setState({
        messageListLayout: { flex: 0, width: 0, height: 0 },
        inputViewLayout: { flex: 1, width: window.width, height: window.height },
        navigationBar: { height: 0 }
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          // style={this.state.navigationBar}
          style={{ width: '100%' }}
          ref="NavigatorView"
        >
          <NavHeader title={this.props.route.params.nick_name} />
        </View>
        <MessageListView style={this.state.messageListLayout}
          ref="MessageList"
          isAllowPullToRefresh={true}
          onAvatarClick={this.onAvatarClick}
          onMsgClick={this.onMsgClick}
          onStatusViewClick={this.onStatusViewClick}
          onTouchMsgList={this.onTouchMsgList}
          onTapMessageCell={this.onTapMessageCell}
          onBeginDragMessageList={this.onBeginDragMessageList}
          onPullToRefresh={this.onPullToRefresh}
          avatarSize={{ width: 50, height: 50 }}
          avatarCornerRadius={25}
          messageListBackgroundColor={"#f3f3f3"}
          sendBubbleTextSize={18}
          sendBubbleTextColor={"#000000"}
          sendBubblePadding={{ left: 10, top: 10, right: 15, bottom: 10 }}
          datePadding={{ left: 5, top: 5, right: 5, bottom: 5 }}
          dateBackgroundColor={"#F3F3F3"}
          photoMessageRadius={5}
          maxBubbleWidth={0.7}
          videoDurationTextColor={"#ffffff"}
          dateTextColor="#666666"
        />
        <InputView style={this.state.inputViewLayout}
          ref="ChatInput"
          onSendText={this.onSendText}
          onTakePicture={this.onTakePicture}
          onStartRecordVoice={this.onStartRecordVoice}
          onFinishRecordVoice={this.onFinishRecordVoice}
          onCancelRecordVoice={this.onCancelRecordVoice}
          onStartRecordVideo={this.onStartRecordVideo}
          onFinishRecordVideo={this.onFinishRecordVideo}
          onSendGalleryFiles={this.onSendGalleryFiles}
          onSwitchToEmojiMode={this.onSwitchToEmojiMode}
          onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
          onSwitchToGalleryMode={this.onSwitchToGalleryMode}
          onSwitchToCameraMode={this.onSwitchToCameraMode}
          onShowKeyboard={this.onShowKeyboard}
          onTouchEditText={this.onTouchEditText}
          onFullScreen={this.onFullScreen}
          onRecoverScreen={this.onRecoverScreen}
          onSizeChange={this.onInputViewSizeChange}
          closeCamera={this.onCloseCamera}
          switchCameraMode={this.switchCameraMode}
          showSelectAlbumBtn={true}
          showRecordVideoBtn={false}
          onClickSelectAlbum={this.onClickSelectAlbum}
          inputPadding={{ left: 30, top: 10, right: 10, bottom: 10 }}
          galleryScale={0.6}//default = 0.5
          compressionQuality={0.6}
          cameraQuality={0.7}//default = 0.5
          customLayoutItems={{
            left: [],
            right: ['send'],
            bottom: ['voice','gallery','emoji','camera']
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sendCustomBtn: {

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputView: {
    backgroundColor: 'green',
    width: window.width,
    height: 100,
  },
  btnStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3e83d7',
    borderRadius: 8,
    backgroundColor: '#3e83d7'
  }
});