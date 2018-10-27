import { db } from '../firebase/firebase'
import firebase from 'firebase/app'

export const createUser = authResult => {
  const picture = authResult.user.photoURL !== null
    ? authResult.user.photoURL
    : "/images/user.svg"

  const user = {
    id: authResult.user.email,
    name: authResult.user.displayName,
    picture: picture,
    isNewUser: true,
    joined: firebase.firestore.Timestamp.fromDate(new Date())
  }

  const userRef = db.collection('users')
  userRef.doc(user.id).set(user).catch(error => {
    console.error(error)
  })
}
