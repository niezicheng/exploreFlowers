import React, { useState } from 'react';
import { View, Image, Text, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from '../../../../components/Icon';
import { BASE_URI } from '../../../../utils/pathMap';
import { pxToDp } from '../../../../utils/stylesKits';
import styles from './style';

const dynamicCard = (props) => {
  const {
    userDetail,
    userInfo,
    currentUser,
  } = props;

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [imgUrls, setImgUrls] = useState([]);

  const handleShowImg = (index) => {
    const imgUrls = userDetail.trends[currentUser].album.map(item => ({ url: `${BASE_URI}${item.thum_img_path}` }))
    setImgUrls(imgUrls);
    setVisible(true);
    setCurrent(index);
  }

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
          <TouchableOpacity
            key={index}
            onPress={() => handleShowImg(index)}
          >
            <Image
              source={{ uri: `${BASE_URI}${imgScr.thum_img_path}`}}
              style={styles.dynamicImg}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Modal visible={visible} transparent>
        <ImageViewer
          imageUrls={imgUrls}
          index={current}
          onClick={() => setVisible(false)}
        />
      </Modal>
    </View>
  );
}

export default dynamicCard;
