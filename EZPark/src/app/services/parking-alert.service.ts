import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import {
  Firestore,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ParkingAlertService {
  private isListenerActive = false;
  constructor(
    private alertController: AlertController,
    private firestore: Firestore
  ) {
    this.listenToParkingSpots();
  }

  listenToParkingSpots() {
    if (this.isListenerActive) {
      return; // Exit if listener is already active
    }

    this.isListenerActive = true;

    const db = getDatabase();
    const parkingSpotsRef = ref(db, 'parking-spots');

    console.log('Listening to parking spots at path: parking-spots');

    onValue(
      parkingSpotsRef,
      (snapshot) => {
        const spotsData = snapshot.val();
        console.log('Snapshot data received:', spotsData);

        if (spotsData) {
          this.checkSpotStatuses(spotsData);
        } else {
          console.warn('No data found at parking-spots.');
        }
      },
      (error) => {
        console.error('Error fetching parking spots:', error);
      }
    );
  }

  checkSpotStatuses(spotsData: any) {
    console.log('Checking statuses for parking spots:', spotsData);

    for (const spot in spotsData) {
      const bookingStatus = spotsData[spot]?.booking_status;
      const parkingStatus = spotsData[spot]?.parking_status;

      console.log(
        `Spot: ${spot}, Booking Status: ${bookingStatus}, Parking Status: ${parkingStatus}`
      );

      if (bookingStatus === 'booked' && parkingStatus === 'Occupied') {
        this.updateSpotStatus(spot, 'Cannot book');
        this.showOccupiedAlert(spot);
      }
    }
  }

  async showOccupiedAlert(spot: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: `Spot ${spot} is currently occupied. Is that you?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            console.log('User successfully parked');
          },
        },
        {
          text: 'No',
          handler: () => {
            this.activateBuzzer(spot);
          },
        },
      ],
    });

    console.log(`Presenting alert for spot: ${spot}`);
    await alert.present();
  }

  activateBuzzer(spot: string) {
    const db = getDatabase();
    const spotRef = ref(db, `parking-spots/${spot}`);

    update(spotRef, { buzzer: true })
      .then(() => {
        console.log(`Buzzer activated for spot ${spot}`);
      })
      .catch((error) => {
        console.error(`Error activating buzzer for spot ${spot}:`, error);
      });
  }
  async updateSpotStatus(parkingSpaceNumber: string, status: string) {
    const bookingsCollection = collection(this.firestore, 'bookings');
    const bookingQuery = query(
      bookingsCollection,
      where('parkingSpaceNumber', '==', parkingSpaceNumber)
    );
    const querySnapshot = await getDocs(bookingQuery);

    if (!querySnapshot.empty) {
      const bookingDoc = querySnapshot.docs[0];
      try {
        await updateDoc(bookingDoc.ref, { status });
        console.log(`Spot ${parkingSpaceNumber} status updated to ${status}`);
      } catch (error) {
        console.error(
          `Error updating status for spot ${parkingSpaceNumber}:`,
          error
        );
      }
    } else {
      console.warn(
        `No booking found with parkingSpaceNumber: ${parkingSpaceNumber}`
      );
    }
  }
}
