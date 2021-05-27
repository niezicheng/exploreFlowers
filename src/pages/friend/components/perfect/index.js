import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from '../../../../components/Icon';
import request from '../../../../utils/request';
import { FRIENDS_TODAYBEST, BASE_URI } from '../../../../utils/pathMap';
import styles from './style';

const PerfectPerson = () => {
  const [perfect, setPerfect] = useState({
    id: 16,
    headers: '/upload/13828459788.jpg',
    nick_name: '若只如初见～',
    gender: '女',
    age: 23,
    marry: '单身',
    xueli: '本科',
    dist: 246.1,
    agediff: 0,
    featValue: 90
  })

  useEffect(() => {
    (async () => {
      const res = await request.privateGet(FRIENDS_TODAYBEST)
      if (res && res.data) {
        setPerfect(res.data[0]);
      }
    })();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        <Image
          style={styles.avatar}
          source={{ uri: `${BASE_URI}${perfect.headers}` }}
        />
        <Text style={styles.tag}>今日佳人</Text>
      </View>
      <View style={styles.desc}>
        <View style={styles.descLeft}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.textColor, { fontWeight: 'bold'}]}>{perfect.nick_name}</Text>
            <Icon
              type={perfect.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
              color={perfect.gender === '男' ? 'red' : '#b564bf'}
              size={18}
              style={styles.genderIcon}
            />
            <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{`${perfect.age}岁`}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textColor}>{perfect.marry}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{perfect.xueli}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{perfect.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
          </View>
        </View>
        <View style={styles.descRight}>
          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', }}>
            <Icon type="iconxihuan" size={50} color='red' />
            <Text style={styles.featValue}>{perfect.featValue}</Text>
          </View>
          <Text style={styles.featValueDesc}>缘分值</Text>
        </View>
      </View>
    </View>
  )
}

export default PerfectPerson;
