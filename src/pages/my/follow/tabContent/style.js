import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {},

  // search
  searchBarWrap: {
    marginHorizontal: pxToDp(10),
    marginVertical: pxToDp(5),
  },

  // userCard
  userCard: {
    paddingHorizontal: pxToDp(10),
    paddingVertical: pxToDp(5),
    backgroundColor: '#FFF',
  },
})
