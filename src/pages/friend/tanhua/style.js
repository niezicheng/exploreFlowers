import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    height: '40%',
  },
  cardContainer: {
    marginTop: pxToDp(15),
    height: '60%',
    borderRadius: pxToDp(4),
    borderWidth: pxToDp(2),
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
  },
  cardImg: {
    width: '100%',
    height: '80%',
  },
  descWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: pxToDp(10),
  },
  genderIcon: {
    marginHorizontal: pxToDp(2),
  },
  textColor: {
    color: '#777',
    fontSize: pxToDp(12),
  },
  hurtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    marginTop: pxToDp(60),
  },
  hurtIconWrap: {
    width: pxToDp(60),
    height: pxToDp(60),
    borderRadius: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftHurt: {
    backgroundColor: '#ebc869',
  },
  rightHurt: {
    backgroundColor: '#fd5213',
  },
})
