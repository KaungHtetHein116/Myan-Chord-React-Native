import React, {useEffect, useState} from 'react';
import {View, Animated, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {ArtistFilter} from '../../redux/actions/DataAction';
import Card from './SongCard';
import _ from 'lodash';
import {Like, Unlike} from '../../redux/actions/DataAction';

const IMAGE_HEIGHT = 400;

const ArtistSong = (props) => {
  const scrollAnimatedValue = new Animated.Value(0);
  const {artist, thumbnail} = props.route.params;
  const [refreshHeartButton, setRefreshHeartButton] = useState(true);
  const {favorite, email} = props.userData.user;

  // console.log(props.Data.artistFilter);

  useEffect(() => {
    props.fetchArtistFilter(artist);
  }, []);

  const heartButton = (item) => {
    const checkFavorite = favorite.includes(item.songId);
    if (checkFavorite) {
      return true;
    } else {
      return false;
    }
  };

  const onAdd = (item) => {
    if (favorite.indexOf(item.songId) === -1) favorite.push(item.songId);
    setRefreshHeartButton(!refreshHeartButton);
    props.LikeSong(email, item.songId);
    console.log(favorite);
  };

  const onRemove = (item) => {
    _.remove(favorite, (itemToRemove) => itemToRemove === item.songId);
    setRefreshHeartButton(!refreshHeartButton);
    props.UnlikeSong(email, item.songId);
    console.log(favorite);
  };
  const catImage = {
    uri: thumbnail,
  };
  return (
    <View style={styles.container}>
      <Animated.Image
        source={catImage}
        style={[
          styles.catImage,
          {
            transform: [
              {
                translateY: scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                  outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 2],
                  extrapolateRight: 'clamp',
                }),
              },
              {
                scale: scrollAnimatedValue.interpolate({
                  inputRange: [-IMAGE_HEIGHT, 0],
                  outputRange: [2, 1],
                  extrapolateRight: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollAnimatedValue}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={styles.scrollViewContentContainer}
        scrollEventThrottle={8} // target 120fps
      >
        <View style={{flex: 1, paddingBottom: 600}}>
          <FlatList
            data={props.Data.artistFilter}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Card
                item={item}
                heartButton={heartButton}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            )}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContentContainer: {
    marginTop: IMAGE_HEIGHT,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  fakeItemContainer: {
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#dedede',
  },
  catImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    alignSelf: 'center',
    borderRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    Data: state.data,
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArtistFilter: (artist) => dispatch(ArtistFilter(artist)),
    LikeSong: (email, songId) => dispatch(Like(email, songId)),
    UnlikeSong: (email, songId) => dispatch(Unlike(email, songId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistSong);
