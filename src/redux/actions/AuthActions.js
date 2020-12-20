import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGN_OUT_USER,
} from './types';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

let userData = null;
export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return firestore()
          .collection('users')
          .doc(email)
          .get()
          .then((doc) => {
            const data = doc.data();
            userData = data;
          })
          .catch((err) => console.log(err));
      })
      .then(() => {
        loginUserSuccess(dispatch, userData);
      })
      .catch((error) => {
        console.log('failed', error);
        loginUserFail(dispatch);
      });
  };
};

export const signupUser = (newUser) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        console.log(resp);
        return firestore().collection('users').doc(resp.user.email).set({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          profileImage: newUser.image,
          uid: resp.user.uid,
        });
      })
      .then(() => {
        return firestore()
          .collection('users')
          .doc(newUser.email)
          .get()
          .then((doc) => {
            const data = doc.data();
            userData = data;
          })
          .catch((err) => console.log(err));
      })
      .then(() => {
        loginUserSuccess(dispatch, userData);
      })
      .catch((error) => {
        console.log('failed', error);
        loginUserFail(dispatch);
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL,
  });
};

const loginUserSuccess = (dispatch, userData) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: userData,
  });
};

export const signOutUser = () => {
  return (dispatch) => {
    auth()
      .signOut()
      .then(() =>
        dispatch({
          type: SIGN_OUT_USER,
        }),
      );
  };
};
