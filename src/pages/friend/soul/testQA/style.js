import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBg: {
    width: '100%',
    height: '100%',
  },
  qTitleWrap: {
    marginTop: pxToDp(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userAvatar: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
  },
  qaTextImage: {
    width: pxToDp(75),
    height: pxToDp(52),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textQues: {
    fontSize: pxToDp(20),
    color: '#fff',
    fontWeight: 'bold',
  },
  numQues: {
    color: '#ffffff9a',
    fontSize: pxToDp(16),
  },
  quesText: {
    width: '80%',
    alignSelf: 'center',
    fontSize: pxToDp(13),
    marginTop: pxToDp(30),
    color: '#fff',
  },
  answersWrap: {
    width: '80%',
    alignSelf: 'center',
  },
  btnWrap: {
    marginTop: pxToDp(10),
  },
  lineGrad: {
    height: pxToDp(40),
    borderRadius: pxToDp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  answersText: {
    color: '#fff',
    fontSize: pxToDp(14),
  },
})
