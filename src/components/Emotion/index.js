import React from 'react';
import { ScrollView, Image, TouchableOpacity } from 'react-native';
import { EMOTION_ARR } from "./datasource";
import { pxToDp, screenWidth } from "../../utils/stylesKits";
const Emotion = (props) => {
  // 获取屏幕的宽度 / 9
  const width = screenWidth / 8;

  const { onPress = () => {} } = props;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handle"
      contentContainerStyle={{ flexDirection:"row", flexWrap:"wrap" }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {EMOTION_ARR.map((v, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onPress(v)}
          style={{ width, height: width, padding: pxToDp(5) }}
        >
          <Image
            style={{ width: '100%', height: '100%' }}
            source={v.value}
          />
        </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

export default Emotion;