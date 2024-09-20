import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
  User,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private auth: Auth, private firestore: Firestore) {}

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
      await updateProfile(userCredential.user, { displayName: name });

      // Save additional user data in Firestore
      const usersRef = collection(this.firestore, 'users');
      await addDoc(usersRef, {
        uid: userCredential.user.uid,
        name: name,
        email: email,
      });

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
      this.auth.onAuthStateChanged(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
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
      const unsubscribe = this.auth.onAuthStateChanged((user) => {
        observer.next(user);
      });
      return unsubscribe;
    });
  }

  // Save a new comment
  async saveComment(comment: { username: string; profilePicture: string; text: string }): Promise<void> {
    const commentsRef = collection(this.firestore, 'comments');
    await addDoc(commentsRef, comment);
  }

  // Get all comments
  async getComments(): Promise<any[]> {
    const commentsRef = collection(this.firestore, 'comments');
    const snapshot = await getDocs(commentsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}