import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RNBounceable from '@freakycoder/react-native-bounceable';
import ImageView from 'react-native-image-viewing';
import SaveButton from './SaveButton';
import {Like, Unlike} from '../../redux/actions/DataAction';
import {connect} from 'react-redux';
import _ from 'lodash';

const Card = ({item, heartButton, onAdd, onRemove}) => {
  const images = [
    {
      uri: item.image,
    },
  ];

  const [visible, setIsVisible] = useState(false);

  const addedMessage = () => {
    ToastAndroid.show('Added to favorite list', ToastAndroid.SHORT);
  };
  const removedMessage = () => {
    ToastAndroid.show('Removed from favorite list', ToastAndroid.SHORT);
  };

  const renderButton = () => {
    if (heartButton(item)) {
      return (
        <View style={styles.favIcon}>
          <TouchableOpacity
            onPress={() => {
              onRemove(item);
              removedMessage();
            }}>
            <Icon name="heart" size={40} color="red" style={{marginLeft: 20}} />
          </TouchableOpacity>
          <SaveButton item={item} />
        </View>
      );
    } else {
      return (
        <View style={styles.favIcon}>
          <TouchableOpacity
            onPress={() => {
              onAdd(item);
              addedMessage();
            }}>
            <Icon
              name="hearto"
              size={40}
              color="white"
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
          <SaveButton item={item} />
        </View>
      );
    }
  };

  return (
    <RNBounceable
      onPress={() => setIsVisible(true)}
      style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image style={styles.thumbnail} source={{uri: item.thumbnail}} />
            <View style={{marginRight: 100, flex: 1}}>
              <Text style={styles.songName}>{item.songNameBurmese}</Text>
              <Text style={styles.singerName}>{item.artistNameBurmese}</Text>
            </View>
          </View>
        </View>
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          FooterComponent={() => renderButton()}
        />
      </View>
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  favIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ' rgba(0, 0, 0, 0.5)',
    height: 60,
  },
  icon: {
    marginRight: 20,
  },
  singerName: {
    fontSize: 13,
    marginTop: 6,
  },
  songName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    alignItems: 'center',
  },
  card: {
    height: 90,
    width: '94%',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 10,
    padding: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LikeSong: (email, songId) => dispatch(Like(email, songId)),
    UnlikeSong: (email, songId) => dispatch(Unlike(email, songId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
