import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialIcons';

export async function request_storage_runtime_permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'ReactNativeCode Storage Permission',
        message:
          'ReactNativeCode App needs access to your storage to download Photos.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Storage Permission Granted.');
    } else {
      Alert.alert('Storage Permission Not Granted');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default function App({item}) {
  useEffect(() => {
    async () => await request_storage_runtime_permission();
  }, []);

  const downloadedMessage = () => {
    ToastAndroid.show('Downloaded to Gallery', ToastAndroid.SHORT);
  };

  const downloadImage = () => {
    ToastAndroid.show('Downloading image', ToastAndroid.SHORT);
    var date = new Date();
    var image_URL = item.image;
    var ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/MyanChord_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        console.log(res);
        downloadedMessage();
      })
      .catch((err) => {
        downloadedMessage();
      });
  };

  const getExtention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={downloadImage}>
        <Icon name="save-alt" size={45} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});
