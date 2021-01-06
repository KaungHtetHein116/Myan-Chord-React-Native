import React, {useState} from 'react';
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/AuthActions';
import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const SignUp = (props) => {
  const [name, setName] = useState('Jack King');
  const [email, setEmail] = useState('test@mail.com');
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('password');
  const [image, setImage] = useState(
    'https://facebook.github.io/react-native/docs/assets/favicon.png',
  );
  const [fileUrl, setFileUrl] = useState(
    'https://facebook.github.io/react-native/docs/assets/favicon.png',
  );

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response) {
        setImage(response.uri);
        uploadImage(response.uri, response.fileName);
      }
    });
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = app.storage().ref();
    const fileRef = storageRef.child('images/' + imageName);
    await fileRef.put(blob);
    setFileUrl(await fileRef.getDownloadURL());
  };
  const newUser = {
    name,
    email,
    password,
    image: fileUrl,
  };

  const handleSubmit = () => {
    props.signupUser(newUser);
  };

  const errorShown = () => {
    if (props.error) return <Text style={{color: 'red'}}>{props.error}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyanChord</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />
      </View>
      {errorShown()}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit}
        activeOpacity={0.8}>
        {props.loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{color: 'white'}}>SIGNUP</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.push('LogIn')}
        activeOpacity={0.8}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#0482f7',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#638dff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },

  loginBtn: {
    width: '80%',
    backgroundColor: '#0482f7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'grey',
  },
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (newUser) => dispatch(signupUser(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
