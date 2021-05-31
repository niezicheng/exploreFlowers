import { StyleSheet } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  imageBg: {
    width: '100%',
    height: '50%',
  },
  card: {
    height: '80%',
    borderRadius: 4,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: pxToDp(20),
    width: '80%',
    alignSelf: 'center',
  },
})
