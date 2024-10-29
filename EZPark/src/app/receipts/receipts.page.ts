import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  Firestore,
  collection,
  getDoc,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButton,
  IonCol,
  IonSearchbar,
  IonCard,
  IonIcon,
  IonItem,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonImg,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRow,
    IonButton,
    IonCol,
    IonSearchbar,
    IonCard,
    IonIcon,
    IonItem,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonImg,
    IonLabel,
    IonList,
    RouterModule,
    CommonModule,
  ],
})
export class ReceiptsPage implements OnInit {
  parkingDetails: any = {
    id: '',
    location: '',
    parkingLevel: '',
    parkingSpaceNumber: '',
    reservationDate: '',
    reservationTime: '',
    carLicenseNumber: '',
    totalAmount: 0,
    date: '',
    duration: '',
    imageUrl: '',
  };
  parkingId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('Received queryParams:', params);
      this.parkingDetails = {
        id: params['id'],
        location: params['location'],
        parkingLevel: params['parkingLevel'],
        parkingSpaceNumber: params['parkingSpaceNumber'],
        reservationDate: params['reservationDate'],
        reservationTime: params['reservationTime'],
        carLicenseNumber: params['carLicenseNumber'],
        totalAmount: params['totalAmount'],
        date: params['date'],
        duration: params['duration'],
        imageUrl: params['imageUrl'] || '',
      };
      this.parkingId = params['id']; // Set the parkingId
    });
  }

  async cancelBooking() {
    if (this.parkingId) {
      const alert = await this.alertController.create({
        header: 'Confirm Cancelation',
        message: 'Are you sure you want to cancel this booking?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
          {
            text: 'Okay',
            handler: async () => {
              const bookingDocRef = doc(
                this.firestore,
                'bookings',
                this.parkingId
              );
              try {
                await deleteDoc(bookingDocRef);
                console.log('Booking canceled successfully.');
                this.router.navigate(['/history']).then(() => {
                  window.location.reload(); // Reload the page after navigation
                });
              } catch (error) {
                console.error('Error canceling booking:', error);
              }
            },
          },
        ],
      });

      await alert.present();
    }
  }
}
