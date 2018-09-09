import {
  auth,
  googleProvider,
  fbProvider,
  db
} from './firebase';

// Sign In
export const doRedirectSignIn = () => auth.signInWithRedirect(googleProvider);

export const doSignInWithGoogle = () => auth.signInWithRedirect(googleProvider);

export const doSignInWithFacebook = () => auth.signInWithRedirect(fbProvider);

export const doSignOut = () => auth.signOut();

auth.getRedirectResult().then(function(result) {
  if (result.user && result.additionalUserInfo.isNewUser) {
      const profile = result.additionalUserInfo.profile;
      const user = {
        email: profile.email,
        name: profile.name,
        gender: profile.gender,
        picture: profile.picture
      }

      db.collection('users')
      .add(user)
      .then(function(docRef) {
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
}).catch(function(error) {
  console.error(error);
});
