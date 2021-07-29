import { StyleSheet } from 'react-native';
import { pxToDp } from '../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // header
  headerWrap: {
    flexDirection: 'row',
    paddingTop: pxToDp(15),
    height: pxToDp(140),
    backgroundColor: '#c7689f',
    paddingHorizontal: pxToDp(20),
  },
  editIcon: {
    marginTop: pxToDp(15),
  },
  itemCardWrap: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: pxToDp(8),
    marginTop: pxToDp(-15),
  },

  // content
  content: {
    marginTop: pxToDp(15),
  }
})