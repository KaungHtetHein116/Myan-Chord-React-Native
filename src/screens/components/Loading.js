import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Loading = () => {
  return (
    <View>
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
            zIndex: 1,
          }}>
          <View style={{width: 70, height: 70, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}>
          <View style={{width: 70, height: 70, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}>
          <View style={{width: 70, height: 70, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}>
          <View style={{width: 70, height: 70, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}>
          <View style={{width: 70, height: 70, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default Loading;
