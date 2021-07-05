import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // input
  input: {
    height: '40%',
    // backgroundColor: 'aqua',
    textAlignVertical: 'top',
    padding: pxToDp(10),
  },

  // location
  locationWrap: {
    alignItems: "flex-end",
    justifyContent: 'center',
    paddingVertical: pxToDp(5),
    paddingHorizontal: pxToDp(25)
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#666',
    fontSize: pxToDp(12),
    paddingLeft: pxToDp(5),
  },

  // photo
  imgContainer: {
    paddingVertical: pxToDp(5),
  },
  image: {
    marginHorizontal: pxToDp(5),
    width: pxToDp(40),
    height: pxToDp(40),
  },

  // pick
  pickWrap: {
    height: pxToDp(40),
    backgroundColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: pxToDp(20),
  },
  iconWrap: {
    marginRight: pxToDp(20),
  }
})
