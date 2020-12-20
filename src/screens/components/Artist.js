import React, {useEffect} from 'react';
import {View, ActivityIndicator, FlatList, Dimensions} from 'react-native';
import {GetArtistData} from '../../redux/actions/DataAction';
import {connect} from 'react-redux';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useNavigation} from '@react-navigation/native';
import ArtistCard from './ArtistCard';

const Artist = (props) => {
  const navigation = useNavigation();

  return props.Data.loadingArtist ? (
    <View
      style={{
        position: 'absolute',
        margin: Dimensions.get('window').width / 2,
      }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : (
    <View style={{marginTop: 40}}>
      <View>
        <FlatList
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={props.Data.dataArtist}
          renderItem={({item}) => {
            return (
              <RNBounceable
                style={{flex: 1 / 2}}
                onPress={() => {
                  navigation.navigate('ArtistFilter', {
                    artist: item.artistNameEnglish,
                    thumbnail: item.thumbnail,
                    item: item,
                  });
                }}>
                <ArtistCard item={item} />
              </RNBounceable>
            );
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    Data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArtistData: () => dispatch(GetArtistData()),
    fetchArtistFilter: () => dispatch(ArtistFilter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
