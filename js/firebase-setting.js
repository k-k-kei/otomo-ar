// firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyCxoyGRfjKAIGktQQrYVUKqc0483EjBQzM",
    authDomain: "otomo-55a4d.firebaseapp.com",
    projectId: "otomo-55a4d",
    storageBucket: "otomo-55a4d.appspot.com",
    messagingSenderId: "92197248863",
    appId: "1:92197248863:web:b127e4bd5b86e63a5e60ea"
};

firebase.initializeApp(firebaseConfig);

//firestoreのデータベースアクセスを変数に代入
const db = firebase.firestore();

const storage = firebase.storage();
const storageRef = storage.ref();