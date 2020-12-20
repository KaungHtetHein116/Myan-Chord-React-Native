import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

export default function ArtistCard({item}) {
  return (
    <View style={styles.card}>
      <ImageBackground source={{uri: item.thumbnail}} style={styles.image}>
        <Text style={styles.text} numberOfLines={2}>
          {item.artistNameBurmese}
        </Text>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: 100,
    alignContent: 'center',
    flex: 1 / 4,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  card: {
    overflow: 'hidden',
    elevation: 10,
    borderRadius: 15,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1 / 2,
    margin: 7,
    height: Dimensions.get('window').width / 3,
  },
});
