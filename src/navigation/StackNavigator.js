import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Capo from '../screens/CapoKey/Capo';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ArtistFilter from '../screens/components/ArtistFilter';
import Favorites from '../screens/components/Favorites';
import Tuner from '../screens/Tuner/Tuner';
import {useDispatch} from 'react-redux';
import {signOutUser} from '../redux/actions/AuthActions';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ArtistFilter"
        component={ArtistFilter}
        options={{title: 'Artists'}}
      />
    </Stack.Navigator>
  );
};
export const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
export const ProfileStackNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Profile',
          headerRight: () => (
            <TouchableOpacity onPress={() => dispatch(signOutUser())}>
              <Icon
                name="logout"
                size={35}
                style={{marginRight: 15, color: 'red'}}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{title: 'My Favorites'}}
      />
      <Stack.Screen
        name="Capo"
        component={Capo}
        options={{title: 'Capo Key'}}
      />
      <Stack.Screen
        name="Tuner"
        component={Tuner}
        options={{title: 'Guitar Tuner'}}
      />
    </Stack.Navigator>
  );
};

export const LogInStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LogIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};
