import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import Swiper from "react-native-deck-swiper";
import NavHeader from '../../../components/NavHeader';
import Button from '../../../components/LGButton';
import request from '../../../utils/request';
import { FRIENDS_QUESTIONS, BASE_URI, DEFAULT_IMG } from '../../../utils/pathMap';
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

const Soul = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions()
  }, []);

  const getQuestions = async () => {
    const res = await request.privateGet(FRIENDS_QUESTIONS);
    if (res && res.data) {
      setQuestions(res.data);
      console.log(res, 'opopop')
    }
  }

  return (
    <View style={styles.container}>
      <NavHeader title='测灵魂' />
      <ImageBackground
        source={require('../../../images/testsoul_bg.png')}
        imageStyle={{ height: '100%' }}
        style={styles.imageBg}
      >
        {questions.length ? (
          <Swiper
            cards={questions}
            renderCard={(card) => {
              return (
                <View style={styles.card}>
                  <Image
                    source={{ uri: `${BASE_URI}${card.imgpath}` }}
                    style={styles.image}
                  />
                </View>
              )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor='transparent'
            cardVerticalMargin={0}
            stackSize= {1}
          />
        ) : null}
      </ImageBackground>
      <Button style={styles.button}>开始测试</Button>
    </View>
  );
}

export default Soul;
