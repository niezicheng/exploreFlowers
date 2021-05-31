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
  const { route: { params }, navigation } = props;
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
      // 跳转展示结果页面
      navigation.navigate('TestResult', res.data);
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
