import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { getDatabase, ref, onValue } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class ParkingAlertService {
  parkingStatus: { [key: string]: string } = {};
  bookingStatus: { [key: string]: string } = {};

  constructor(private alertController: AlertController) {
    this.listenToParkingStatus();
  }

  listenToParkingStatus() {
    const db = getDatabase();
    const parkingStatusRef = ref(db, 'parking_status');

    onValue(parkingStatusRef, (snapshot) => {
      const statusData = snapshot.val();
      if (statusData) {
        for (const spot in statusData) {
          this.parkingStatus[spot] = statusData[spot];
          this.checkStatus(spot); // Check status for each parking spot
        }
      }
    });
  }

  async checkStatus(spot: string) {
    const bookingStatus = this.bookingStatus[spot];
    const parkingStatus = this.parkingStatus[spot];

    if (bookingStatus === 'Booked' && parkingStatus === 'Occupied') {
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
              console.log(`Activate buzzer for spot ${spot}`);
            },
          },
        ],
      });
      await alert.present();
    }
  }
}
