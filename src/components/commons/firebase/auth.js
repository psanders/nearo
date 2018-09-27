import {
  auth,
  googleProvider,
  fbProvider,
  db
} from './firebase'

auth.getRedirectResult().then(function(result) {
  if (result.user && result.additionalUserInfo.isNewUser) {
    const user = {
      name: result.user.name,
      picture: result.user.photoUrl,
      isNewUser: true
    }
    const userRef = db.collection('users')
    userRef.doc(result.user.email).set(user)
  }
}).catch(function(error) {
  console.error('Unable to authenticate', error)
})
