import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import request from '../../../../utils/request';
import { FRIENDS_QUESTIONSECTION, BASE_URI, FRIENDS_QUESTIONANS } from '../../../../utils/pathMap';
import NavHeader from '../../../../components/NavHeader';
import styles from './style';

// qid: 1
// type: "初级"
// title: "初级灵魂题"
// star: 2
// imgpath: "/upload/questions/1.png"
// status: 0
// count: 3
// sort_no: 1
// istested: true
// islock: false

// qsid: 1
// question_title: "未来生活的幸福指数，跟物质和精神哪个关系更大？"
// answers: [{
//   qsid: 1
//   ans_title: "跟物质关系更大"
//   ans_No: "A"
// }]

const mapTypeToUrl = {
  '初级': require('../../../../images/level1.png'),
  '中级': require('../../../../images/level2.png'),
  '高级': require('../../../../images/level3.png'),
};

const mapNumToText = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '七',
  8: '八',
  9: '九',
  10: '十',
};

const TestQA = (props) => {
  const { route: { params } } = props;
  const user = props.UserStore.user;

  const { qid, title, type } = params;

  // 展示的问题信息数组
  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  let answersList = []; // 存储选择的答案信息数组

  useEffect(() => {
    getTestQA();
  }, []);

  // 获取题目数据信息
  const getTestQA = async () => {
    const url = FRIENDS_QUESTIONSECTION.replace(':id', qid);
    const res = await request.privateGet(url);

    if (res && res.data) {
      setQuestionList(res.data);
    }
  }

  // 点击选择答案
  const handelSelectAnswer = async (answerChar) => {

    answersList.push(answerChar);
    if (currentIndex >= questionList.length - 1) {
      // 最后一题
      const url = FRIENDS_QUESTIONANS.replace(':id', qid);
      const answers = answersList.join(',');

      const res = await request.privatePost(url, { answers });
      // {
      //   "code": "10000",
      //   "data": {
      //     "abstract": 79,
      //     "content": "你们有着对幸福的相同定义，更愿意脚踏实地的去创造丰厚优质的生活；
      //     你们对生活有着相同的感触， 也许经历不同， 但你们都知道物质才是生活的基础， 没有面包的爱情也许不会幸福；
      //     你们都对生活有着极致的追求， 属于宁缺毋滥型。
      //     你们都认为人生短暂， 不能把酒言欢的生活都是在浪费时间；
      //     你们对命运这种事情， 有着难得一致的认同感， 都认为有些感情早已安排妥当， 只是静静的等待我们去发现。 ", "
      //     currentUser ": {"
      //     Distance ": 9666804.2, "
      //     address ": "
      //     fjdskjfdvdksjkfkjksjkcjdkjvk ", "
      //     age ": 23, "
      //     amount ": null, "
      //     birthday ": "
      //     1995 - 03 - 03 T16: 00: 00.000 Z ", "
      //     city ": "
      //     天津 ", "
      //     email ": null, "
      //     gender ": "
      //     男 ", "
      //     guid ": "
      //     186657119781591501526289 ", "
      //     header ": " / upload / 162151615708018665711978. jpg ", "
      //     id ": 7, "
      //     lat ": 110, "
      //     lng ": 110, "
      //     login_time ": "
      //     2021 - 05 - 31 T15: 25: 32.000 Z ", "
      //     marry ": "
      //     单身 ", "
      //     mobile ": "
      //     18665711978 ", "
      //     nick_name ": "
      //     admin ", "
      //     status ": 0, "
      //     vcode ": "
      //     888888 ", "
      //     xueli ": "
      //     本科 "}, "
      //     extroversion ": 80, "
      //     judgment ": 85, "
      //     qid ": 1, "
      //     rational ": 85}, "
      //     msg ": "
      //     请求成功 "
      // }
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  if (!questionList[currentIndex]) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NavHeader title={title} />
      <ImageBackground
        source={require('../../../../images/qabg.png')}
        style={styles.imageBg}
      >
        <View style={styles.qTitleWrap}>
          <ImageBackground
            source={require('../../../../images/qatext.png')}
            style={styles.qaTextImage}
          >
            <Image
              source={{ uri: `${BASE_URI}${user.header}` }}
              style={styles.userAvatar}
            />
          </ImageBackground>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textQues}>{`第${mapNumToText[currentIndex + 1]}题`}</Text>
            <Text style={styles.numQues}>{`(${currentIndex + 1}/${questionList.length})`}</Text>
          </View>
          <ImageBackground
            source={mapTypeToUrl[type]}
            style={styles.qaTextImage}
          />
        </View>
        <Text style={styles.quesText}>{questionList[currentIndex].question_title}</Text>
        <View style={styles.answersWrap}>
          {questionList[currentIndex].answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handelSelectAnswer(answer.ans_No)}
              style={styles.btnWrap}
            >
              <LinearGradient
                style={styles.lineGrad}
                colors={['#6f45f3', '#6f45f31a']}
              >
                <Text style={styles.answersText}>{answer.ans_title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
}

export default inject('UserStore')(observer(TestQA));
