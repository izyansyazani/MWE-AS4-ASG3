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
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from '@angular/fire/firestore';
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

  // // Google Sign-In
  // async googleSignIn(): Promise<UserCredential> {
  //   const provider = new GoogleAuthProvider();
  //   return await signInWithPopup(this.auth, provider);
  // }

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
  async saveComment(comment: {
    username: string;
    profilePicture: string;
    text: string;
    userId: string;
    pageId: string;
  }): Promise<void> {
    const commentsRef = collection(this.firestore, 'comments');
    await addDoc(commentsRef, comment);
  }

  // Get comments by pageId
  async getComments(pageId: string): Promise<any[]> {
    const commentsRef = collection(this.firestore, 'comments');
    const q = query(commentsRef, where('pageId', '==', pageId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // Delete a comment by id
  async deleteComment(commentId: string): Promise<void> {
    const commentDoc = doc(this.firestore, 'comments', commentId);
    await deleteDoc(commentDoc);
  }

  // Add a parking spot to user's favorites
  async addFavoriteParking(
    userId: string,
    parkingSpotId: string,
    parkingSpotData: any
  ): Promise<void> {
    const favoriteDocRef = doc(
      this.firestore,
      `users/${userId}/favorites`,
      parkingSpotId
    );
    await setDoc(favoriteDocRef, parkingSpotData);
  }

  // Remove a parking spot from user's favorites
  async removeFavoriteParking(
    userId: string,
    parkingSpotId: string
  ): Promise<void> {
    const favoriteDocRef = doc(
      this.firestore,
      `users/${userId}/favorites`,
      parkingSpotId
    );
    await deleteDoc(favoriteDocRef);
  }

  // Get all favorite parking spots for a user
  getUserFavorites(userId: string): Observable<any[]> {
    return new Observable((observer) => {
      const favoritesRef = collection(
        this.firestore,
        `users/${userId}/favorites`
      );
      const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
        const favorites = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        observer.next(favorites);
      });
      return unsubscribe;
    });
  }

  async savePaymentDetails(userId: string, paymentDetails: any): Promise<void> {
    const paymentsRef = collection(this.firestore, 'payments');
    await addDoc(paymentsRef, {
      userId: userId,
      ...paymentDetails,
      createdAt: new Date(),
    });
  }

  async getPaymentHistory(userId: string): Promise<any[]> {
    const paymentsRef = collection(this.firestore, 'payments');
    const q = query(paymentsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
