import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from '../../../components/Icon';
import request from '../../../utils/request';
import { QZ_TJDT, BASE_URI } from '../../../utils/pathMap';
import { pxToDp } from '../../../utils/stylesKits';
import date  from '../../../utils/date';
import styles from './style';

const Recommend = () => {
  const [params, setParams] = useState({
    page: 1,
    pagesize: 10,
  }); // 接口参数
  const [listData, setListData] = useState([]); // 数据数组
  const [visible, setVisible] = useState(false); // 显示预览图片 modal
  const [imgUrls, setImgUrls] = useState([]); // 预览的图片数组
  const [current, setCurrent] = useState(0); // 当前预览的图片索引

  const [totalPages, setTotalPages] = useState(2); // 数据总的页数
  const [isLoading, setIsLoading] = useState(false); // 是否正在请求数据信息

  useEffect(() => {
    getList();
  }, [])

  // 获取展示的数据信息
  const getList = async() => {
    const res = await request.privateGet(QZ_TJDT, params);
    if (res.code === '10000') {
      setListData([ ...listData, ...res.data ]);
      setTotalPages(res.pages);
      setIsLoading(false);
    }
  }

  // 图片点击预览方法
  const handleShowImg = (images, index) => {
    const imgUrls = images.map(item => ({ url: `${BASE_URI}${item.thum_img_path}` }))
    setImgUrls(imgUrls);
    setVisible(true);
    setCurrent(index);
  }

  // 数据渲染卡片内容
  const renderItem = ({ item, index }) => (
    <>
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
          <TouchableOpacity
            activeOpacity={0.8}
          >
            <Icon type="icongengduo" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.contentText}>{item.content}</Text>
        <View style={styles.imgWrap}>
          {item.images.map((imgScr, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleShowImg(item.images, index)}
            >
              <Image
                source={{ uri: `${BASE_URI}${imgScr.thum_img_path}`}}
                style={styles.dynamicImg}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: pxToDp(5) }}>
          <Text style={{ color: '#666', marginRight: pxToDp(10) }}>距离 {item.dist} km</Text>
          <Text style={{ color: '#666' }}>{date(item.create_time).fromNow()}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon type="icondianzan-o" size={18} color="#666" />
            <Text style={{ color: '#666', marginLeft: pxToDp(2) }}>{item.star_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon type="iconpinglun" size={18} color="#666" style={{ marginTop: pxToDp(4) }} />
            <Text style={{ color: '#666', marginLeft: pxToDp(2) }}>{item.comment_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon type="iconxihuan-o" size={18} color="#666" />
            <Text style={{ color: '#666', marginLeft: pxToDp(2) }}>{item.like_count}</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={visible} transparent>
          <ImageViewer
            imageUrls={imgUrls}
            index={current}
            onClick={() => setVisible(false)}
          />
        </Modal>
      </View>
      {
        index === listData.length - 1 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: pxToDp(10) }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC' }} />
            <Text style={{ color: '#CCCCCC', marginHorizontal: pxToDp(10) }}>
              { params.page < totalPages ? '' :  '没有更多了'}
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#CCCCCC' }} />
          </View>
        )
      }
    </>
  )

  // 触发触底事件
  const onEndReached = () => {
    const { page } = params;
    console.log('onEndReached=======', totalPages, page)
    // 是否存在下一页数据信息
    if (page >= totalPages || isLoading) {
      return;
    } else {
      setIsLoading(true);
      setParams({
        ...params,
        page: page + 1
      });
      getList();
    }
    // 节流阀
  }

  return (
    <FlatList
      data={listData}
      keyExtractor={item => `${item.tid}`}
      renderItem={renderItem}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
    />
  );
}

export default Recommend;
