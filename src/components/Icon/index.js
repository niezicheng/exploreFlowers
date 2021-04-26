import React from 'react';
import SvgUri from 'react-native-svg-uri';
import sources from './fonts/iconSvg';

export default (props) => {
  const {
    // svg = true,
    type,
    name,
    size = 22,
  } = props;

  return (
    <SvgUri
      svgXmlData={sources[name || type]}
      width={size}
      height={size}
    />
  )
}
