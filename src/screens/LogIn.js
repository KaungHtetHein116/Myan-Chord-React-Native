import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/AuthActions';
import {GetSongData, GetArtistData} from '../redux/actions/DataAction';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

function LogIn(props) {
  const [email, setEmail] = useState('test@mail.com');
  const [password, setPassword] = useState('password');
  const {loading} = props;
  const handleSubmit = () => {
    props.loginUser({email, password});
    props.GetSongData();
    props.GetArtistData();
  };
  const errorShown = () => {
    if (props.error) return <Text>{props.error} !!!</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyanChord</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
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
      {errorShown()}
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{color: 'white'}}>LOGIN</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.push('SignUp')}
        activeOpacity={0.8}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  forgot: {
    color: 'grey',
    fontSize: 11,
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

export default connect(mapStateToProps, {
  loginUser,
  GetSongData,
  GetArtistData,
})(LogIn);
