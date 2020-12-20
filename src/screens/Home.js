import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {GetSongData, GetArtistData} from '../redux/actions/DataAction';
import SegmentedControl from 'rn-segmented-control';
import AllSongs from './components/AllSongs';
import Artist from './components/Artist';

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <View>
      <View style={styles.container}>
        <SegmentedControl
          tabs={['All Songs', 'Artists']}
          currentIndex={tabIndex}
          onChange={handleTabsChange}
          segmentedControlBackgroundColor="#86c4fd"
          activeSegmentBackgroundColor="#0482f7"
          activeTextColor="white"
          textColor="black"
          paddingVertical={18}
          width={360}
        />
      </View>
      <View>{tabIndex === 0 ? <AllSongs /> : <Artist />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 7,
  },
  textStyle: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    Data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSongData: () => dispatch(GetSongData()),
    fetchArtistData: () => dispatch(GetArtistData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
