import React from 'react';
import { View, Image, Text } from 'react-native';
import Icon from '../../../../components/Icon';
import { BASE_URI } from '../../../../utils/pathMap';
import { pxToDp } from '../../../../utils/stylesKits';
import styles from './style';

const UserInfoCard = (props) => {
  const {
    userDetail,
    userInfo,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: `${BASE_URI}${userDetail.header}` }}
          style={styles.avatar}
        />
        <View style={styles.headerRight}>
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
      </View>

      <Text style={styles.contentText}>{userInfo.content}</Text>
      <View style={styles.imgWrap}>
        {userInfo.album.map((imgScr, index) => (
          <Image
            key={index}
            source={{ uri: `${BASE_URI}${imgScr.thum_img_path}`}}
            style={styles.dynamicImg}
          />
        ))}
      </View>
    </View>
  );
}

export default UserInfoCard;
