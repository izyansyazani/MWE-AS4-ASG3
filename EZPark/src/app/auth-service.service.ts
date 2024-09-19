// import { Injectable } from '@angular/core';
// import { AngularFireAuth, } from '@angular/fire/compat/auth';
// import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithPopup, } from "firebase/auth";
// import { User } from 'firebase/auth';

// import { Observable, async } from 'rxjs';
// import firebase from 'firebase/compat/app';
// // import { error, log } from 'console';
// import {
//   CollectionReference,
//   DocumentData,
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from '@firebase/firestore';
// import { Firestore, collectionData, docData } from '@angular/fire/firestore';
// // import { userInfo } from 'os';

// export interface Users{
//   name:string;
//   email: string
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceService {

//   constructor(public ngFireAuth: AngularFireAuth) {

//   }

//   async registerUser(email: string, password: string, name: string) {
//     return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)

//   }

//   async loginUser(email: string, password: string) {
//     return await this.ngFireAuth.signInWithEmailAndPassword(email, password);

//   }

//   async resetPassword(email: string) {
//     return await this.ngFireAuth.sendPasswordResetEmail(email);

//   }
//   async getProfile():Promise <User | null> {
//     return new Promise<User | null>((resolve, reject) => {
//       this.ngFireAuth.onAuthStateChanged(user => {
//         if (user) {
//           resolve(user as User);
//         } else {
//           resolve(null);
//         }
//       }, reject);
//     })
//   }

//   async signOut() {
//     return await this.ngFireAuth.signOut();
//   }

// }

import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  UserCredential,
  User,
  updateProfile,
} from '@firebase/auth';
import {
  Firestore,
  addDoc,
  collection,
  getFirestore,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { getAuth } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private auth: Auth;
  private firestore: Firestore;

  constructor() {
    this.auth = getAuth();
    this.firestore = getFirestore();
  }

  // Register a new user
  async registerUser(
    email: string,
    password: string,
    name: string
  ): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Update user profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });

        // Save additional user data in Firestore
        const usersRef = collection(this.firestore, 'users');
        await addDoc(usersRef, {
          uid: userCredential.user.uid,
          name: name,
          email: email,
        });
      }

      return userCredential;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Login existing user
  async loginUser(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }

  // Get current user profile
  async getProfile(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          resolve(user);
        },
        reject
      );
    });
  }

  // Sign out
  async signOut(): Promise<void> {
    return await signOut(this.auth);
  }

  // Google Sign-In
  async googleSignIn(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  // Observable for auth state
  getAuthState(): Observable<User | null> {
    return new Observable((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
      return unsubscribe;
    });
  }
}
