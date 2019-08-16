import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import postReducer from './postReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  forums: postReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});
