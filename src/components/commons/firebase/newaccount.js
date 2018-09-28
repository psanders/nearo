import { db } from '../firebase/firebase'
import { openURL } from '../utils'

export const createUser = authResult => {
  const picture = authResult.user.photoURL !== null
    ? authResult.user.photoURL
    : "/images/default-avatar.png"

  const user = {
    id: authResult.user.email,
    name: authResult.user.displayName,
    picture: picture,
    isNewUser: true,
    username: authResult.user.displayName.replace(/\W/g, '').toLowerCase()
  }

  const userRef = db.collection('users')
  userRef.doc(user.id).set(user).then(() =>{
    openURL('/profile')
  }).catch(error => {
    console.log(error)
  })
}
