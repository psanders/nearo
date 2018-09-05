import { auth, googleProvider, fbProvider } from './firebase';

// Sign In
export const doRedirectSignIn = () =>
  auth.signInWithRedirect(googleProvider);

export const doSignInWithGoogle = () =>
  auth.signInWithRedirect(googleProvider);

export const doSignInWithFacebook = () =>
  auth.signInWithRedirect(fbProvider);

// Sign out
export const doSignOut = () =>
  auth.signOut();
