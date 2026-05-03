// src/services/firebaseAuth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import type { User } from '../types';

// Convert Firebase User to our User type
export const convertFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    username: firebaseUser.email || firebaseUser.displayName || 'User',
  };
};

// Register with email and password
export const registerWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return convertFirebaseUser(userCredential.user);
};

// Login with email and password
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return convertFirebaseUser(userCredential.user);
};

// Login with Google
export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return convertFirebaseUser(userCredential.user);
};

// Logout
export const logout = async () => {
  await signOut(auth);
};

// Change password
export const changeUserPassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error('No user is currently signed in');
  }

  // Re-authenticate user before changing password
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);

  // Update password
  await updatePassword(user, newPassword);
};
