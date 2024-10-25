import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { getDatabase, ref, onValue } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class ParkingAlertService {
  constructor(private alertController: AlertController) {
    this.listenToParkingSpots();
  }

  listenToParkingSpots() {
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
      const bookingStatus = spotsData[spot]?.booking_status || 'unknown';
      const parkingStatus = spotsData[spot]?.parking_status || 'unknown';

      console.log(
        `Spot: ${spot}, Booking Status: ${bookingStatus}, Parking Status: ${parkingStatus}`
      );

      if (bookingStatus === 'booked' && parkingStatus === 'Occupied') {
        this.showOccupiedAlert(spot);
      } else {
        console.log(`Spot ${spot} is either available or not booked.`);
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
          role: 'cancel',
        },
        {
          text: 'No',
          handler: () => {
            console.log(`Activate buzzer for spot ${spot}.`);
          },
        },
      ],
    });

    console.log(`Presenting alert for spot: ${spot}`);
    await alert.present();
  }
}
