import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: pxToDp(120),
    height: pxToDp(120),
  },
  tag: {
    width: pxToDp(80),
    backgroundColor: '#b564bf',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    bottom: pxToDp(10),
    textAlign: 'center',
    color: '#fff',
    paddingVertical: pxToDp(2),
  },
  desc: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: pxToDp(4),
    paddingRight: pxToDp(30),
  },
  descLeft: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  genderIcon: {
    marginHorizontal: pxToDp(2),
  },
  descRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featValue: {
    color: '#fff',
    fontSize: pxToDp(13),
    fontWeight: 'bold',
    position: 'absolute',
  },
  featValueDesc: {
    fontSize: pxToDp(13),
    color: 'red',
  },
  textColor: {
    color: '#777',
    fontSize: pxToDp(12),
  }
})
