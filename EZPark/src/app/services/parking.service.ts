import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { AuthServiceService } from './auth-service.service'; // Adjust the path if needed
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(
    private firestore: Firestore,
    private authService: AuthServiceService
  ) {}

  // Save a parking booking
  async saveParkingBooking(parkingDetails: {
    location: string;
    date: string;
    duration: string;
    imageUrl: string;
  }): Promise<void> {
    const user: User | null = await this.authService.getProfile(); // Await the profile to get User
    if (user) {
      const bookingsRef = collection(this.firestore, 'parkingBookings');
      await addDoc(bookingsRef, {
        ...parkingDetails,
        userId: user.uid, // Ensure userId is included
      });
    } else {
      console.error('User is not authenticated');
    }
  }

  // Get parking bookings for the current user
  async getUserParkingBookings(): Promise<any[]> {
    const user: User | null = await this.authService.getProfile(); // Await the profile to get User
    if (user) {
      const bookingsRef = collection(this.firestore, 'parkingBookings');
      const q = query(bookingsRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
    return []; // Return an empty array if user is not authenticated
  }
}

// import { Injectable } from '@angular/core';
// import {
//   Firestore,
//   doc,
//   setDoc,
//   updateDoc,
//   docData,
// } from '@angular/fire/firestore';
// import { collection, collectionData } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ParkingService {
//   constructor(private firestore: Firestore) {}

//   // Get all parking spots
//   getParkingSpots(): Observable<any[]> {
//     const parkingSpotsCollection = collection(this.firestore, 'parkingSpots');
//     return collectionData(parkingSpotsCollection, { idField: 'id' });
//   }

//   // Get a single parking spot by its ID
//   getParkingSpot(spotId: string): Observable<any> {
//     const spotDocRef = doc(this.firestore, `parkingSpots/${spotId}`);
//     return docData(spotDocRef);
//   }

//   // Book a parking spot (create or update a booking)
//   bookParkingSpot(spotId: string, bookingDetails: any): Promise<void> {
//     const spotDocRef = doc(this.firestore, `parkingSpots/${spotId}`);
//     return setDoc(spotDocRef, bookingDetails, { merge: true });
//   }

//   // Update parking spot status (mark as booked or available)
//   updateParkingSpotStatus(spotId: string, status: string): Promise<void> {
//     const spotDocRef = doc(this.firestore, `parkingSpots/${spotId}`);
//     return updateDoc(spotDocRef, { status });
//   }
// }
