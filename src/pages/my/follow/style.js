import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {},

  // eachLike
  eachLikeWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: pxToDp(80),
    height: pxToDp(25),
    borderWidth: pxToDp(1),
    borderColor: '#CCC',
    borderRadius: pxToDp(4),
  },

  textStyle: {
    color: '#666',
  },

  // like
  likeIcon: {
    marginRight: pxToDp(20)
  }
})