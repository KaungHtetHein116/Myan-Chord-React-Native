import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import MainScreen from './screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              title: 'Capo Key',
              headerStyle: {
                backgroundColor: 'white',
              },
              headerLeft: () => (
                <Image
                  style={styles.Image}
                  source={{
                    uri:
                      'data:image/png;base64,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',
                  }}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Image: {
    height: 55,
    width: 60,
    marginLeft: 7,
  },
});

export default App;
