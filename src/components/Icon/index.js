import React from 'react';
import { Text } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import svgSources from './fonts/iconSvg';
import sources from './fonts/icon';

export default (props) => {
  const {
    svg = false,
    type,
    name,
    size = 22,
    color,
    style,
  } = props;
<Text style={{ fontFamily: "iconfont", color: "red" }} >{'\ue82b'}</Text>
  return (
    svg ? (
      <SvgUri
        svgXmlData={svgSources[type || name]}
        width={size}
        height={size}
        fill={color}
      />
    ) : (
      <Text
        style={{
          ...style,
          fontFamily: 'iconfont',
          fontSize: size,
          color: color,
        }}
      >
        {sources[type || name]}
      </Text>
    )
  )
}
