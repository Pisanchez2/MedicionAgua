import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCO0L3P7jXbQ6G0xIP6shA6ArXlOhli7KA",
    authDomain: "tasrfb-71da7.firebaseapp.com",
    databaseURL: "https://tasrfb-71da7.firebaseio.com",
    projectId: "tasrfb-71da7",
    storageBucket: "tasrfb-71da7.appspot.com",
    messagingSenderId: "134098273312",
    appId: "1:134098273312:web:cfbb88af60922e1fd66845",
    measurementId: "G-KR29GVTD8K"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;