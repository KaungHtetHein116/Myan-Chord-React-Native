import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
//UI
import {connect} from 'react-redux';
import RNBounceable from '@freakycoder/react-native-bounceable';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, marginTop: 20}}>
      <RNBounceable
        onPress={() => {
          navigation.navigate('Favorites');
        }}>
        <View style={styles.Button}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/favorite.jpg')}
              style={{height: 50, width: 50, borderRadius: 50}}
            />
            <Text style={styles.TextView}>My Favorites</Text>
          </View>
        </View>
      </RNBounceable>
      <RNBounceable
        onPress={() => {
          navigation.navigate('Capo');
        }}>
        <View style={styles.Button}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/capo.jpg')}
              style={{height: 50, width: 50, borderRadius: 50}}
            />
            <Text style={styles.TextView}>Capo Key</Text>
          </View>
        </View>
      </RNBounceable>
      <RNBounceable
        onPress={() => {
          navigation.navigate('Tuner');
        }}>
        <View style={styles.Button}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/tuner.jpg')}
              style={{height: 50, width: 50, borderRadius: 50}}
            />
            <Text style={styles.TextView}>Gutiar Tuner</Text>
          </View>
        </View>
      </RNBounceable>
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    elevation: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  TextView: {
    fontSize: 20,
    marginLeft: 20,
  },
});

const mapStateToProps = (state) => ({
  userData: state.auth,
  Data: state.data,
});

export default connect(mapStateToProps, null)(Profile);
