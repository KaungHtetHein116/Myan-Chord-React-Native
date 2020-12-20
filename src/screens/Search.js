import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {GetSongData} from '../redux/actions/DataAction';
import _ from 'lodash';
import Card from './components/SongCard';
import {Like, Unlike} from '../redux/actions/DataAction';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = (props) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [refreshHeartButton, setRefreshHeartButton] = useState(true);
  const {favorite, email} = props.userData.user;

  useEffect(() => {
    setFilteredDataSource(props.Data.dataSong);
    setMasterDataSource(props.Data.dataSong);
  }, []);

  const searchFilterFunction = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(masterDataSource, (song) => {
      if (
        song.songNameEnglish.includes(formattedQuery) ||
        song.songNameBurmese.includes(formattedQuery) ||
        song.artistNameBurmese.includes(formattedQuery) ||
        song.artistNameBurmese.includes(formattedQuery)
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredDataSource(data);
    setSearch(text);
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

  return (
    <View>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 4,
          borderRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#d1eaff',
            paddingHorizontal: 20,
            borderRadius: 20,
          }}>
          <Icon name="search" size={35} />
          <TextInput
            onChangeText={(text) => searchFilterFunction(text)}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            placeholder="မျှော်လင့်ခြင်းကွင်းပြင်"
            style={{
              fontSize: 18,
            }}
          />
        </View>
      </View>
      <View>
        {props.Data.loadingSong ? (
          <View
            style={{
              position: 'absolute',
              margin: Dimensions.get('window').width / 2,
            }}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={filteredDataSource}
            renderItem={({item}) => (
              <Card
                item={item}
                heartButton={heartButton}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    Data: state.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
