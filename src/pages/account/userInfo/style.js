import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: pxToDp(20),
  },
  title: {
    fontSize: pxToDp(20),
    color: '#999',
    fontWeight: 'bold',
  },
  intro: {
    fontSize: pxToDp(18),
    color: '#999',
    fontWeight: 'bold',
  },
  avatarWrap: {
    marginVertical: pxToDp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  avatar: {
    backgroundColor: '#CCC',
    borderRadius: pxToDp(30),
    width: pxToDp(60),
    height: pxToDp(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeAvatar: {
    backgroundColor: '#7d53ea',
  }
})