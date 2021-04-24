import React from 'react';
import { Text } from 'react-native';
import styles from './style';

import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';

export default (props) => {
  const {
    value,
    cellCount = 6,
    onChange,
    ...restProps
  } = props;

  return (
    <CodeField
      {...restProps}
      value={value}
      onChangeText={onChange}
      cellCount={cellCount}
      rootStyle={styles.codeFiledRoot}
      keyboardType="number-pad"
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  )
}
