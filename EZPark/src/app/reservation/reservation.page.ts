import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ParkingService } from '../services/parking.service';

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
  IonGrid,
  IonButtons,
  IonBackButton,
  IonList,
  IonDatetime,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
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
    IonGrid,
    IonButtons,
    IonBackButton,
    IonList,
    IonDatetime,
    IonInput,
  ],
})
export class ReservationPage implements OnInit {
  bookingDetails = {
    parkingLevel: '',
    parkingSpaceNumber: '',
    reservationDate: '',
    reservationTime: '',
    duration: '',
    carLicenseNumber: '',
    totalAmount: 0,
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private location: Location,
    private parkingService: ParkingService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['parkingSpaceNumber']) {
        this.bookingDetails.parkingSpaceNumber = params['parkingSpaceNumber'];
      }
      if (params['parkingLevel']) {
        this.bookingDetails.parkingLevel = params['parkingLevel'];
      }
    });
  }

  updateTotalAmount() {
    const duration = parseFloat(this.bookingDetails.duration);
    if (!isNaN(duration)) {
      this.bookingDetails.totalAmount = duration * 1.0;
    } else {
      this.bookingDetails.totalAmount = 0;
    }
  }

  confirmBooking() {
    this.updateTotalAmount();
    const bookingDetails = {
      name: this.bookingDetails.carLicenseNumber,
      status: 'reserved', // Reserve the spot
    };

    // Save booking to Firestore
    this.parkingService
      .bookParkingSpot(this.bookingDetails.parkingSpaceNumber, bookingDetails)
      .then(() => {
        console.log('Reservation saved to Firestore');
        this.router.navigate(['/paypal'], {
          queryParams: { bookingDetails: JSON.stringify(this.bookingDetails) },
        });
      })
      .catch((err) => {
        console.error('Error booking spot:', err);
      });
  }
  imageUrl: string = '';
  label: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('Received queryParams:', params); // Debugging line
      this.imageUrl = params['imageUrl'] || '';
      this.label = params['label'] || '';
    });
  }
  goToBack() {
    this.location.back();
  }

  areInputsFilled() {
    return Object.values(this.bookingDetails).every((value) => {
      return value !== '' && value !== null && value !== undefined;
    });
  }
}
