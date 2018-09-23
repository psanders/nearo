import {
  auth,
  googleProvider,
  fbProvider,
  db
} from './firebase'

function getProvider (pId) {
  return pId === 'facebook' ? fbProvider : googleProvider
}

// Sign In
function doRedirectSignIn(provider) {
  auth.signInWithRedirect(provider)
  .catch(function(error) {
  if (error.code === 'auth/account-exists-with-different-credential') {
    console.log('Holly Cow')
    const pendingCred = error.credential
    const email = error.email
    auth.fetchSignInMethodsForEmail(email).then(function(methods) {
      // TODO: implement getProviderForProviderId.
      var provider = getProvider(methods[0])
      auth.signInWithRedirect(provider).then(function(result) {
        result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
          // No-op
        })
      })
    })
  }
})
}

export const doSignInWithGoogle = () => doRedirectSignIn(fbProvider)

export const doSignInWithFacebook = () => doRedirectSignIn(fbProvider)

export const doSignOut = () => auth.signOut()

auth.getRedirectResult().then(function(result) {
  if (result.user && result.additionalUserInfo.isNewUser) {
      const profile = result.additionalUserInfo.profile
      const picture = result.additionalUserInfo.providerId === 'facebook.com'
        ? profile.picture.data.url
        : profile.picture
      const user = {
        email: profile.email,
        username: '',
        name: profile.name,
        picture: picture,
        isNewUser: true
      }
      const userRef = db.collection('users')
      userRef.doc(profile.email).set(user)
  }
}).catch(function(error) {
  console.error('Unable to authenticate', error)
})
