import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Swiper from "react-native-deck-swiper";
import { Toast } from 'teaset';
import NavHeader from '../../../components/NavHeader';
import Icon from '../../../components/Icon';
import request from '../../../utils/request';
import { FRIENDS_CARDS, BASE_URI, DEFAULT_IMG, FRIENDS_LIKE } from '../../../utils/pathMap';
import styles from './style';

const TanHua = () => {
  const [params, setParams] = useState({
    page: 1,
    pagesize: 5,
  });
  const [totalPages, setTotalPages] = useState(5);
  const [cardList, setCardList] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  useEffect(() => {
    getFriendsCards();
  }, [])

  // 获取探花展示数据信息
  const getFriendsCards = async (data) => {
    const res = await request.privateGet(FRIENDS_CARDS, data || params);
    if (res && res.data) {
      setTotalPages(res.pages);
      setCardList([ ...cardList, ...res.data ]);
    }
  };

  let swiperRef = null;

  // 用户喜欢或不喜欢点击事件
  const handleLink = async (type) => {
    /**
     * 1. 通过 js 方式来 swiper 滑动
     *  - swiper ref 实例方法 swipeLeft、swipeRight.
     * 2. 根据滑动方向或参数来构造数据发送给后台
     *  - 了解当前操作的图片索引
     */
    sendLink(type);
    if (type === 'dislike') {
      swiperRef.swipeLeft();
    } else {
      swiperRef.swipeRight()
    }
  }

  // 发送喜欢或不喜欢信息
  const sendLink = async (type) => {
    const { id } = cardList[selectedCardIndex];
    const url = FRIENDS_LIKE.replace(':id', id).replace(':type', type);
    const res = await request.privateGet(url);

    Toast.message(res.data, 1000, 'center');
  }

  // 滑动所有最后事件
  const handleSwipedAll = async() => {
    /**
     * 1、是否有下一页数据
     * 2、判断有下一页
     */
    const { page } = params;
    if (page >= totalPages) {
      Toast.message('没有更多数据信息了！！！');
    } else {
      getFriendsCards({ ...params, page: page + 1 });
      setParams({ ...params,  page: page + 1 })
    }
  }

  return (
    <View style={styles.container}>
      <NavHeader title='探花' />
      <ImageBackground
        source={require('../../../images/testsoul_bg.png')}
        imageStyle={{ height: '100%' }}
        style={styles.imageBg}
      >
        {cardList && cardList[selectedCardIndex] ? (
          <Swiper
            key={Date.now()}
            ref={node => swiperRef = node}
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
            onSwiped={() => setSelectedCardIndex(selectedCardIndex + 1)}
            onSwipedLeft={() => sendLink('dislike')}
            onSwipedRight={() => sendLink('like')}
            onSwipedAll={handleSwipedAll}
            cardIndex={selectedCardIndex}
            cardVerticalMargin={0}
            backgroundColor='transparent'
            stackSize= {3}
          />
        ) : null}
      </ImageBackground>
      <View style={styles.hurtContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleLink('dislike')}
          style={[styles.hurtIconWrap, styles.leftHurt]}
        >
          <Icon type='iconbuxihuan' size={40} color='#fff'  />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleLink('like')}
          style={[styles.hurtIconWrap, styles.rightHurt]}
        >
          <Icon type='iconxihuan' size={40} color='#fff'  />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TanHua;
