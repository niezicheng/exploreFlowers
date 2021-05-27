import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Swiper from "react-native-deck-swiper";
import NavHeader from '../../../components/NavHeader';
import Icon from '../../../components/Icon';
import request from '../../../utils/request';
import { FRIENDS_CARDS, BASE_URI, DEFAULT_IMG } from '../../../utils/pathMap';
import styles from './style';

// id: 8
// header: "/upload/13828459782.png"
// nick_name: "雾霭朦胧"
// age: 21
// gender: "女"
// marry: "未婚"
// xueli: "大专"
// dist: 0

const TanHua = () => {
  const [params] = useState({
    page: 1,
    pagesize: 5,
  });
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await request.privateGet(FRIENDS_CARDS, params);
      console.log(res, 'pppppp');
      if (res && res.data) {
        setCardList(res.data);
      }
    })();
  }, [])

  return (
    <View style={styles.container}>
      <NavHeader title='探花' />
      <ImageBackground
        source={require('../../../images/testsoul_bg.png')}
        imageStyle={{ height: '100%' }}
        style={styles.imageBg}
      >
        {cardList && cardList.length ? (
          <Swiper
            cards={cardList}
            renderCard={(card) => {
              return (
                <View style={styles.cardContainer}>
                  <Image
                    defaultSource={{ uri: DEFAULT_IMG }}
                    source={{ uri: `${BASE_URI}${card.header}` }}
                    style={styles.cardImg}
                  />
                  <View style={styles.descWrap}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.textColor, { fontWeight: 'bold'}]}>{card.nick_name}</Text>
                      <Icon
                        type={card.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
                        color={card.gender === '男' ? 'red' : '#b564bf'}
                        size={18}
                        style={styles.genderIcon}
                      />
                      <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{`${card.age}岁`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.textColor}>{card.marry}</Text>
                      <Text style={styles.textColor}> | </Text>
                      <Text style={styles.textColor}>{card.xueli}</Text>
                      <Text style={styles.textColor}> | </Text>
                      <Text style={styles.textColor}>{card.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
                    </View>
                  </View>
                </View>
              )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            cardVerticalMargin={0}
            backgroundColor='transparent'
            stackSize= {3}
          />
        ) : null}
      </ImageBackground>
      <View style={styles.hurtContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={[styles.hurtIconWrap, styles.leftHurt]}
        >
          <Icon type='iconbuxihuan' size={40} color='#fff'  />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={[styles.hurtIconWrap, styles.rightHurt]}
        >
          <Icon type='iconxihuan' size={40} color='#fff'  />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TanHua;
