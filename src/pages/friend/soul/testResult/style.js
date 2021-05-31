import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  imageBg: {
    flex: 1,
    width: '100%',
  },
  resultImgBg: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  title: {
    color: '#ffffff9a',
    letterSpacing: pxToDp(8),
    position: 'absolute',
    top: '1%',
    left: '6%',
  },
  descWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '45%',
    position: 'absolute',
    top: '6%',
    right: '5%',
  },
  nickName: {
    color: '#fff',
    fontSize: pxToDp(16),
  },
  contentWrap: {
    width: '45%',
    height: '25%',
    position: 'absolute',
    top: '12%',
    right: '5%',
  },
  contentText: {
    color: '#fff',
  },
  nature: {
    position: 'absolute',
    top: '43%',
  },
  natureText: {
    color: '#ffffff9a',
  },
  seemYou: {
    color: '#ffffff9a',
    position: 'absolute',
    top: '69%',
    left: '5%',
    fontSize: pxToDp(14),
  },
  avatarWrap: {
    height: '11%',
    width: '96%',
    position: 'absolute',
    top: '72%',
    left: '2%',
  },
  avatar: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
    marginHorizontal: pxToDp(5),
  },
  button: {
    width: '96%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '5%',
  },
})
