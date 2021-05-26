import React from 'react';
import { View, Text, Image } from 'react-native';
import { BASE_URI } from '../../../../utils/pathMap';
import Icon from '../../../../components/Icon';
import styles from './style';

const ItemCard = (props) => {
  const { recommend } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: `${BASE_URI}${recommend.header}` }}
      />
      <View style={styles.desc}>
        <View style={styles.descLeft}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.textColor, { fontWeight: 'bold'}]}>{recommend.nick_name}</Text>
            <Icon
              type={recommend.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
              color={recommend.gender === '男' ? 'red' : '#b564bf'}
              size={18}
              style={styles.genderIcon}
            />
            <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{`${recommend.age}岁`}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textColor}>{recommend.marry}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{recommend.xueli}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{recommend.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
          </View>
        </View>
        <View style={styles.descRight}>
          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', }}>
            <Icon type="iconxihuan" size={40} color='red' />
            <Text style={styles.featValue}>{recommend.fateValue}</Text>
          </View>
          <Text style={styles.featValueDesc}>缘分值</Text>
        </View>
      </View>
    </View>
  );
}

export default ItemCard;
