import {
  auth,
  db
} from './firebase'

auth.getRedirectResult().then(function(result) {
  if (result.user && result.additionalUserInfo.isNewUser) {
    window.alert('WTF')
    const picture = result.user.photoUrl

    const user = {
      name: result.user.name,
      picture: picture,
      isNewUser: true
    }
    const userRef = db.collection('users')
    userRef.doc(result.user.email).set(user)
  }
}).catch(function(error) {
  console.error('Unable to authenticate', error)
})
