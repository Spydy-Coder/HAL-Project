import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBoZcS0Pwr0QAddLW8j5wyRrdbJWnECyik",
//   authDomain: "whatsapp-web-clone-a8d93.firebaseapp.com",
//   databaseURL: "https://whatsapp-web-clone-a8d93.firebaseio.com",
//   projectId: "whatsapp-web-clone-a8d93",
//   storageBucket: "whatsapp-web-clone-a8d93.appspot.com",
//   messagingSenderId: "830002031050",
//   appId: "1:830002031050:web:3772d26aa86981b099c733",
//   measurementId: "G-687Y7YYCPP",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyAPDa90ko9o1q4wvLmdT969cJj6decURUs",
//   authDomain: "testhal.firebaseapp.com",
//   databaseURL: "https://testhal-default-rtdb.firebaseio.com",
//   projectId: "testhal",
//   storageBucket: "testhal.appspot.com",
//   messagingSenderId: "1025828335373",
//   appId: "1:1025828335373:web:3d450ef4c234f6b59bca44",
//   measurementId: "G-DN532W054B"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCina8gJuymZ2D7__8NfH8D_VoXW55rS2Q",
  authDomain: "hal-resolver.firebaseapp.com",
  databaseURL: "https://hal-resolver.firebaseapp.com",
  projectId: "hal-resolver",
  storageBucket: "hal-resolver.appspot.com",
  messagingSenderId: "427284168458",
  appId: "1:427284168458:web:a1d6d47ab807e7f6dfc4f3",
  measurementId: "G-3G82TXD9X1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
