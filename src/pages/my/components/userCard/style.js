import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits'

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  // left
  avatar: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderRadius: pxToDp(25),
  },

  // middle
  headerMiddle: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginLeft: pxToDp(15),
  },
  nickName: {
    fontSize: pxToDp(14),
    fontWeight: 'bold',
    marginRight: pxToDp(10),
  },
  genderAge: {
    display: 'flex',
    flexDirection: 'row',
  },
  genderIcon: {
    marginRight: pxToDp(5),
  },
  textColor: {
    color: '#777',
    fontSize: pxToDp(12),
  },

  // city
  cityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    fontSize: pxToDp(14),
    color: '#FFF',
    marginLeft: pxToDp(5),
  }
})