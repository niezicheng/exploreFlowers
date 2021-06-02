import React from 'react';
import { View, Text } from 'react-native';
import Icon from '../../../../components/Icon';
import { pxToDp } from '../../../../utils/stylesKits';
import styles from './style';

const UserInfoCard = (props) => {
  const { userDetail } = props;

  return (
    <View style={styles.container}>
      <View style={styles.descLeft}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: pxToDp(10) }}>
          <Text style={[styles.textColor, { fontWeight: 'bold'}]}>{userDetail.nick_name}</Text>
          <Icon
            type={userDetail.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
            color={userDetail.gender === '男' ? 'red' : '#b564bf'}
            size={18}
            style={styles.genderIcon}
          />
          <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{`${userDetail.age}岁`}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textColor}>{userDetail.marry}</Text>
          <Text style={styles.textColor}> | </Text>
          <Text style={styles.textColor}>{userDetail.xueli}</Text>
          <Text style={styles.textColor}> | </Text>
          <Text style={styles.textColor}>{userDetail.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
        </View>
      </View>
      <View style={styles.descRight}>
        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', }}>
          <Icon type="iconxihuan" size={40} color='red' />
          <Text style={styles.featValue}>{userDetail.fateValue}</Text>
        </View>
        <Text style={styles.featValueDesc}>缘分值</Text>
      </View>
    </View>
  );
}

export default UserInfoCard;
