import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from '../../../../components/Icon';
import { BASE_URI } from '../../../../utils/pathMap';
import { pxToDp } from '../../../../utils/stylesKits';
import date  from '../../../../utils/date';
import styles from './style';

const DynamicCard = (props) => {
  const {
    user,
    handelMore,
    style,
  } = props;

  const [visible, setVisible] = useState(false); // 显示预览图片 modal
  const [imgUrls, setImgUrls] = useState([]); // 预览的图片数组
  const [current, setCurrent] = useState(0); // 当前预览的图片索引

  // 图片点击预览方法
  const handleShowImg = (images, index) => {
    const imgUrls = images.map(item => ({ url: `${BASE_URI}${item.thum_img_path}` }))
    setImgUrls(imgUrls);
    setVisible(true);
    setCurrent(index);
  }

  return (
    <View style={style}>
      <View style={styles.header}>
        <Image
          source={{ uri: `${BASE_URI}${user.header}` }}
          style={styles.avatar}
        />
        <View style={styles.headerRight}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: pxToDp(10) }}>
            <Text style={[styles.textColor, { fontWeight: 'bold'}]}>{user.nick_name}</Text>
            <Icon
              type={user.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
              color={user.gender === '男' ? 'red' : '#b564bf'}
              size={18}
              style={styles.genderIcon}
            />
            <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{`${user.age}岁`}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textColor}>{user.marry}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{user.xueli}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{user.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
          </View>
        </View>
        {handelMore && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handelMore(user)}
          >
            <Icon type="icongengduo" size={18} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.contentText}>{user.content}</Text>
      <View style={styles.imgWrap}>
        {user.images.map((imgScr, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleShowImg(user.images, index)}
          >
            <Image
              source={{ uri: `${BASE_URI}${imgScr.thum_img_path}`}}
              style={styles.dynamicImg}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pxToDp(5) }}>
        <Text style={{ color: '#666', marginRight: pxToDp(10) }}>距离 {user.dist} km</Text>
        <Text style={{ color: '#666' }}>{date(user.create_time).fromNow()}</Text>
      </View>
      <Modal visible={visible} transparent>
          <ImageViewer
            imageUrls={imgUrls}
            index={current}
            onClick={() => setVisible(false)}
          />
        </Modal>
    </View>
  )
}

export default DynamicCard;
