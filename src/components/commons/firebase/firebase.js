import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const prodConfig = {
  apiKey: "AIzaSyC27pgP5VsYnR6FNFHTWYf4WJQUjR-Npck",
  authDomain: "nearo.co",
  databaseURL: "https://nearo-52fe3.firebaseio.com",
  projectId: "nearo-52fe3",
  storageBucket: "nearo-52fe3.appspot.com",
  messagingSenderId: "225376231981"
}

const devConfig = {
  apiKey: "AIzaSyC27pgP5VsYnR6FNFHTWYf4WJQUjR-Npck",
  authDomain: "nearo.co",
  databaseURL: "https://nearo-52fe3.firebaseio.com",
  projectId: "nearo-52fe3",
  storageBucket: "nearo-52fe3.appspot.com",
  messagingSenderId: "225376231981"
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()
db.settings({timestampsInSnapshots: true})

export { auth, db }
