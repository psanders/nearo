import { auth, provider } from './firebase';

// Sign In
export const doRedirectSignIn = () =>
  auth.signInWithRedirect(provider);

// Sign out
export const doSignOut = () =>
  auth.signOut();
