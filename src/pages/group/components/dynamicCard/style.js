import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: pxToDp(40),
    height: pxToDp(40),
    borderRadius: pxToDp(20),
  },
  headerRight: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: pxToDp(15),
  },
  genderIcon: {
    marginHorizontal: pxToDp(10),
  },
  textColor: {
    color: '#777',
    fontSize: pxToDp(12),
  },
  contentView: {
    marginTop: pxToDp(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imgWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dynamicImg: {
    width: pxToDp(70),
    height: pxToDp(70),
    marginRight: pxToDp(5),
  },
})