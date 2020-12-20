import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStackNavigator} from './StackNavigator';
import {SearchStackNavigator} from './StackNavigator';
import {ProfileStackNavigator} from './StackNavigator';
import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        initialParams={{icon: 'home'}}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        initialParams={{icon: 'search1'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        initialParams={{icon: 'profile'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
