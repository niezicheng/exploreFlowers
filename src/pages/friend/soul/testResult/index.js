import React from 'react';
import { ImageBackground, Text, View, ScrollView, Image } from 'react-native';
import NavHeader from '../../../../components/NavHeader';
import { BASE_URI } from '../../../../utils/pathMap';
import Button from '../../../../components/LGButton';
import styles from './style';

// {
//   "code": "10000",
//   "data": {
//     "abstract": 79,
//     "content": "你们有着对幸福的相同定义，更愿意脚踏实地的去创造丰厚优质的生活；
//     你们对生活有着相同的感触， 也许经历不同， 但你们都知道物质才是生活的基础， 没有面包的爱情也许不会幸福；
//     你们都对生活有着极致的追求， 属于宁缺毋滥型。
//     你们都认为人生短暂， 不能把酒言欢的生活都是在浪费时间；
//     你们对命运这种事情， 有着难得一致的认同感， 都认为有些感情早已安排妥当， 只是静静的等待我们去发现。 ", "
//     currentUser ": {"
//     Distance ": 9666804.2, "
//     address ": "
//     fjdskjfdvdksjkfkjksjkcjdkjvk ", "
//     age ": 23, "
//     amount ": null, "
//     birthday ": "
//     1995 - 03 - 03 T16: 00: 00.000 Z ", "
//     city ": "
//     天津 ", "
//     email ": null, "
//     gender ": "
//     男 ", "
//     guid ": "
//     186657119781591501526289 ", "
//     header ": " / upload / 162151615708018665711978. jpg ", "
//     id ": 7, "
//     lat ": 110, "
//     lng ": 110, "
//     login_time ": "
//     2021 - 05 - 31 T15: 25: 32.000 Z ", "
//     marry ": "
//     单身 ", "
//     mobile ": "
//     18665711978 ", "
//     nick_name ": "
//     admin ", "
//     status ": 0, "
//     vcode ": "
//     888888 ", "
//     xueli ": "
//     本科 "}, "
//     extroversion ": 80, "
//     judgment ": 85, "
//     qid ": 1, "
//     rational ": 85}, "
//     msg ": "
//     请求成功 "
// }

const TestResult = (props) => {
  const { route: { params }, navigation } = props;
  const {
    currentUser: { nick_name, header },
    content,
    extroversion,
    judgment,
    abstract,
    rational,
  } = params;
  return (
    <ImageBackground
      source={require('../../../../images/qabg.png')}
      style={styles.imageBg}
    >
      <NavHeader title='测试结果' />
      <ImageBackground
        resizeMode='stretch'
        source={require('../../../../images/result.png')}
        style={styles.resultImgBg}
      >
        <Text style={styles.title}>灵魂基因鉴定单</Text>
        <View style={styles.descWrap}>
          <Text style={styles.nickName}>[</Text>
          <Text style={styles.nickName}>{nick_name}</Text>
          <Text style={styles.nickName}>]</Text>
        </View>
        <ScrollView
          style={styles.contentWrap}
        >
          <Text style={styles.contentText}>{content}</Text>
        </ScrollView>
        <View style={[styles.nature, { left: '5%' }]}>
          <Text style={styles.natureText}>外向</Text>
          <Text style={styles.natureText}>{extroversion}%</Text>
        </View>
        <View style={[styles.nature, { left: '5%', top: '49%' }]}>
          <Text style={styles.natureText}>判断</Text>
          <Text style={styles.natureText}>{judgment}%</Text>
        </View>
        <View style={[styles.nature, { left: '5%', top: '56%' }]}>
          <Text style={styles.natureText}>抽象</Text>
          <Text style={styles.natureText}>{abstract}%</Text>
        </View>
        <View style={[styles.nature, { right: '5%' }]}>
          <Text style={styles.natureText}>理性</Text>
          <Text style={styles.natureText}>{rational}%</Text>
        </View>
        <Text style={styles.seemYou}>与你相似</Text>
        <ScrollView
          style={styles.avatarWrap}
          horizontal
          contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9 ,10].map((item) => (
            <Image
              key={item}
              source={{ uri: `${BASE_URI}${header}` }}
              style={styles.avatar}
            />
          ))}
        </ScrollView>
        <Button
          onPress={() => navigation.navigate('Soul')}
          style={styles.button}
        >
          继续测试
        </Button>
      </ImageBackground>
    </ImageBackground>
  );
}

export default TestResult;
