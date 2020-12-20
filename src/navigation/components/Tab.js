import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RNBounceable from '@freakycoder/react-native-bounceable';

export default function Tab({color, tab, onPress, icon}) {
  return (
    <RNBounceable style={styles.container} onPress={onPress}>
      <Icon name={icon} size={20} color={color} />
      <Text style={{color: color}}>{tab.name}</Text>
    </RNBounceable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
