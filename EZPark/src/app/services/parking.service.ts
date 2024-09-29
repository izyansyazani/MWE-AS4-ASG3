import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  constructor(private firestore: Firestore) {}

  // Get all parking spots
  getParkingSpots(): Observable<any[]> {
    const parkingSpotsCollection = collection(this.firestore, 'parkingSpots');
    return collectionData(parkingSpotsCollection, { idField: 'id' });
  }

  // Get a single parking spot by its ID
  getParkingSpot(spotId: string): Observable<any> {
    const spotDocRef = doc(this.firestore, `parkingSpots/${spotId}`);
    return docData(spotDocRef);
  }

  // Book a parking spot (create or update a booking)
  bookParkingSpot(spotId: string, bookingDetails: any): Promise<void> {
    const spotDocRef = doc(this.firestore, `parkingSpots/${spotId}`);
    return setDoc(spotDocRef, bookingDetails, { merge: true });
  }

  // Update parking spot status (mark as booked or available)
  updateParkingSpotStatus(spotId: string, status: string): Promise<void> {
    const spotDocRef = doc(this.firestore, `parkingSpots/${spotId}`);
    return updateDoc(spotDocRef, { status });
  }
}
