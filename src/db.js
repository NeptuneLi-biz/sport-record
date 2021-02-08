import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyATdDCKHc3Dr-WOLcmjyqhRuZHygTvfuPo",
  authDomain: "sport-record.firebaseapp.com",
  projectId: "sport-record",
  storageBucket: "sport-record.appspot.com",
  messagingSenderId: "724225078070",
  appId: "1:724225078070:web:208edcefdd628ea6c57997",
  measurementId: "G-JMNLGNM00W"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
