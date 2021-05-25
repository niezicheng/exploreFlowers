import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  wrap: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    alignItems: 'center',
  },
  iconWrap: {
    width: pxToDp(70),
    height: pxToDp(70),
    borderRadius: pxToDp(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTitle: {
    fontSize: pxToDp(18),
    marginTop: pxToDp(4),
    color: '#ffffff9a',
  }
})
