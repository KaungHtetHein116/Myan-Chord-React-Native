import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Tab from './Tab';

const {width} = Dimensions.get('screen');
export default function TabBar({state, navigation}) {
  const [selected, setSelected] = useState('Home');

  const {routes} = state;

  const renderColor = (currentTab) =>
    currentTab === selected ? 'dodgerblue' : 'black';

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    bottom: 10,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: 250,
    backgroundColor: '#d1eaff',
    borderRadius: 100,
    elevation: 7,
  },
});
