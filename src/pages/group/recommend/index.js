import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from '../../../components/Icon';
import request from '../../../utils/request';
import { QZ_TJDT, BASE_URI } from '../../../utils/pathMap';
import { pxToDp } from '../../../utils/stylesKits';
import styles from './style';

const Recommend = () => {
  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
  });
  const [listData, setListData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [imgUrls, setImgUrls] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getList();
  }, [])

  const getList = async() => {
    const res = await request.privateGet(QZ_TJDT, params);
    if (res.code === '10000') {
      setListData(res.data);
    }
  }

  const handleShowImg = (item, index) => {
    const imgUrls = item.trends[currentUser].album.map(item => ({ url: `${BASE_URI}${item.thum_img_path}` }))
    setImgUrls(imgUrls);
    setVisible(true);
    setCurrent(index);
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: `${BASE_URI}${item.header}` }}
          style={styles.avatar}
        />
        <View style={styles.headerRight}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: pxToDp(10) }}>
            <Text style={[styles.textColor, { fontWeight: 'bold'}]}>{item.nick_name}</Text>
            <Icon
              type={item.gender === '男' ? 'icontanhuanan' : 'icontanhuanv'}
              color={item.gender === '男' ? 'red' : '#b564bf'}
              size={18}
              style={styles.genderIcon}
            />
            <Text style={[styles.textColor, { fontWeight: 'bold', }]}>{`${item.age}岁`}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textColor}>{item.marry}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{item.xueli}</Text>
            <Text style={styles.textColor}> | </Text>
            <Text style={styles.textColor}>{item.agediff < 10 ? '年龄相仿' : '有点代沟'}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.contentText}>{item.content}</Text>
      <View style={styles.imgWrap}>
        {item.images.map((imgScr, index) => (
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
  )

  return (
    <FlatList
      data={listData}
      keyExtractor={item => `${item.tid}`}
      renderItem={renderItem}
    />
  );
}

export default Recommend;
