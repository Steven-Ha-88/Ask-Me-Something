import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCrVVwAKmvOSKNq5uXMeIJuoVha6LasrvE',
  authDomain: 'ask-me-something-e4828.firebaseapp.com',
  databaseURL: 'https://ask-me-something-e4828.firebaseio.com',
  projectId: 'ask-me-something-e4828',
  storageBucket: '',
  messagingSenderId: '574691223472',
  appId: '1:574691223472:web:885c96a441a716bc'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
