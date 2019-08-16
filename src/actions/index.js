import history from '../history';
import firebase from '../config/fbconfig';
import {
  CREATE_POST,
  CREATE_POST_ERROR,
  CREATE_COMMENT,
  CREATE_COMMENT_ERROR,
  EDIT_POST,
  EDIT_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './types';

export const signIn = credentials => (dispatch) => {
  // const firebase = getFirebase();

  firebase.auth().signInWithEmailAndPassword(
    credentials.email,
    credentials.password
  ).then(() => {
    dispatch({ type: SIGN_IN_SUCCESS });
    history.push('/');
  }).catch((err) => {
    dispatch({ type: SIGN_IN_ERROR, err });
  });
};

export const signOut = () => async (dispatch) => {
  await firebase.auth().signOut();

  dispatch({ type: SIGN_OUT_SUCCESS });
};


export const signUp = newUser => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firebase.auth().createUserWithEmailAndPassword(
    newUser.email,
    newUser.password
  ).then(res => firestore.collection('users').doc(res.user.uid).set({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    initials: newUser.firstName[0] + newUser.lastName[0]
  })).then(() => {
    dispatch({ type: SIGN_UP_SUCCESS });
  })
    .catch((err) => {
      dispatch({ type: SIGN_UP_ERROR, err });
    });
};


export const createPost = formValues => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const { profile } = getState().firebase;
  const authorId = getState().firebase.auth.uid;

  firestore.collection('Forums').add({
    ...formValues,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    authorId,
    authorInitials: profile.initials,
    createdAt: new Date()
  }).then(() => {
    dispatch({ type: CREATE_POST, formValues });
  }).catch((err) => {
    dispatch({ type: CREATE_POST_ERROR, err });
  });
  history.push('/');
};

export const createComment = (docId, formValues) => (dispatch, getState, { getFirestore }) => {
  // make async call to database
  const firestore = getFirestore();
  const { profile } = getState().firebase;
  console.log(docId, formValues); // TUeF9trV2OjQmvJW9cxU {comment: "hello world"}

  firestore.collection('Forums').doc(docId).collection('comments').add({
    ...formValues,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    createdAt: new Date()
  })
    .then(() => {
      dispatch({ type: CREATE_COMMENT, formValues });
    })
    .catch((err) => {
      console.log('error', err);
      dispatch({ type: CREATE_COMMENT_ERROR, err });
    });
  history.push(`/forum/${docId}`);
};

export const editPost = (docId, formValues) => (dispatch, getState, { getFirestore }) => {
  // make async call to database
  const firestore = getFirestore();

  firestore.collection('Forums').doc(docId).update({
    ...formValues
  })
    .then(() => {
      dispatch({ type: EDIT_POST, formValues });
    })
    .catch((err) => {
      dispatch({ type: EDIT_ERROR, err });
    });
  history.push('/');
};

export const deletePost = id => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();

  firestore.collection('Forums').doc(id).delete().then(() => {
    dispatch({ type: DELETE_POST_SUCCESS });
  })
    .catch((err) => {
      dispatch({ type: DELETE_POST_ERROR, err });
    });
  history.push('/');
};
