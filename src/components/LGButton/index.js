import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default (props) => {
  const {
    children,
    activeOpacity,
    onPress,
    textStyle,
    wrapStyle,
    style,
    start = { x: 0, y: 0 },
    end = { x: 0, y: 1 },
    colors = ['#9b63cd', '#e0708c'],
    ...restProps
  }  = props;

  return (
    <TouchableOpacity
      {...restProps}
      style={wrapStyle}
      activeOpacity={activeOpacity || 0.8}
      onPress={onPress}
    >
      <LinearGradient
        start={start}
        end={end}
        colors={colors}
        style={[styles.container, style]}
      >
        <Text style={[styles.buttonText, textStyle]}>
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});