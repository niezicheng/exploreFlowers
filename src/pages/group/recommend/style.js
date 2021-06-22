import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    padding: pxToDp(15),
    borderBottomColor: '#eee',
    borderBottomWidth: pxToDp(1),
  },
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
    justifyContent: 'space-between',
    marginLeft: pxToDp(10),
  },
  genderIcon: {
    marginHorizontal: pxToDp(10),
  },
  textColor: {
    color: '#777',
    fontSize: pxToDp(12),
  },
  contentText: {
    paddingVertical: pxToDp(8),
    color: '#666',
  },
  imgWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dynamicImg: {
    width: pxToDp(70),
    height: pxToDp(70),
    marginRight: pxToDp(5),
  }
})
