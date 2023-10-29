import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCZ_Z8s720W8KjPUUXmQIyz9HbGPQa4ZU",
    authDomain: "faca-voce-mesmo-824aa.firebaseapp.com",
    projectId: "faca-voce-mesmo-824aa",
    storageBucket: "faca-voce-mesmo-824aa.appspot.com",
    messagingSenderId: "359064092899",
    appId: "1: 359064092899: web: cff5c0284a40f04f0345d6"
};
firebaseConfig.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;