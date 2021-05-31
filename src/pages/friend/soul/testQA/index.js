import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { inject, observer } from 'mobx-react';
import request from '../../../../utils/request';
import { FRIENDS_QUESTIONSECTION } from '../../../../utils/pathMap';
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
}

const TestQA = (props) => {
  const { route: { params } } = props;

  const { qid, title, type } = params;

  const [questionList, setQuestionList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(props.UserStore.user, '==========')
    getTestQA();
  }, []);

  const getTestQA = async () => {
    const url = FRIENDS_QUESTIONSECTION.replace(':id', qid);
    const res = await request.privateGet(url);

    if (res && res.data) {
      setQuestionList(res.data);
    }
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
          ></ImageBackground>
          <ImageBackground
            source={mapTypeToUrl[type]}
            style={styles.qaTextImage}
          ></ImageBackground>
        </View>
      </ImageBackground>
    </View>
  );
}

export default inject('UserStore')(observer(TestQA));
