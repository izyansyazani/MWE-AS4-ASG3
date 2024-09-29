import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private firestore: Firestore) {}

  async addBooking(booking: any) {
    const bookingsCollection = collection(this.firestore, 'bookings');
    return await addDoc(bookingsCollection, booking);
  }

  async getUserParkingBookings(userId: string) {
    const bookingsCollection = collection(this.firestore, 'bookings');
    const q = query(bookingsCollection, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
