import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {GetSongData} from '../../redux/actions/DataAction';
import Card from './SongCard';
import Loading from './Loading';
import {Like, Unlike} from '../../redux/actions/DataAction';
import _ from 'lodash';

const Favorites = (props) => {
  const [fav, setFav] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshHeartButton, setRefreshHeartButton] = useState(true);
  const {favorite, email} = props.userData.user;
  const {dataSong} = props.data;

  useEffect(() => {
    fitler();
    console.log(fav);
  }, [favorite]);

  let array = [];
  const fitler = async () => {
    favorite.map((favSongId) => {
      dataSong.map((dataSong) => {
        if (dataSong.songId === favSongId) {
          array.push(dataSong);
        }
      });
    });
    setFav(array);
    console.log(favorite);
  };

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
    console.log(fav);
  };

  const onRemove = (item) => {
    _.remove(favorite, (itemToRemove) => itemToRemove === item.songId);
    _.remove(fav, (itemToRemove) => itemToRemove === item.songId);
    setRefreshHeartButton(!refreshHeartButton);
    props.UnlikeSong(email, item.songId);
  };

  if (favorite.length < 1) {
    return (
      <View style={styles.TextView}>
        <Text style={{fontSize: 25}}>Your Favorite List is Empty</Text>
      </View>
    );
  } else {
    return props.data.loadingSong ? (
      <View style={{marginTop: 25}}>
        <Loading />
      </View>
    ) : (
      <View>
        <View>
          <FlatList
            refreshing={refreshing}
            keyExtractor={(item, index) => index.toString()}
            data={fav}
            renderItem={({item}) => {
              return (
                <Card
                  item={item}
                  heartButton={heartButton}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  TextView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    data: state.data,
    userData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongData: () => dispatch(GetSongData()),
    LikeSong: (email, songId) => dispatch(Like(email, songId)),
    UnlikeSong: (email, songId) => dispatch(Unlike(email, songId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
