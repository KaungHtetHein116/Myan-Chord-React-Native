import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Like, Unlike} from '../../redux/actions/DataAction';
import {GetSongData} from '../../redux/actions/DataAction';
import {connect} from 'react-redux';
import Card from './SongCard';
import Loading from './Loading';
import _ from 'lodash';

const AllSongs = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshHeartButton, setRefreshHeartButton] = useState(true);
  const {favorite, email} = props.userData.user;
  const {dataSong} = props.data;

  const handleRefresh = async () => {
    await setRefreshing(true);
    await props.fetchSongData();
    await setRefreshing(false);
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
    console.log(favorite);
  };

  const onRemove = (item) => {
    _.remove(favorite, (itemToRemove) => itemToRemove === item.songId);
    setRefreshHeartButton(!refreshHeartButton);
    props.UnlikeSong(email, item.songId);
    console.log(favorite);
  };

  return props.data.loadingSong ? (
    <View style={{marginTop: 25}}>
      <Loading />
    </View>
  ) : (
    <View style={{marginTop: 40}}>
      <View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={dataSong}
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
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSongs);
