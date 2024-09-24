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

  spot: string = '';

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
    this.parkingService.bookSpot(this.bookingDetails.parkingSpaceNumber);
    this.updateTotalAmount();
    this.router.navigate(['/paypal'], {
      queryParams: {
        bookingDetails: JSON.stringify(this.bookingDetails),
      },
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['spot']) {
        this.spot = params['spot'];
        this.bookingDetails.parkingSpaceNumber = this.spot;
      }
    });
  }
  goToBack() {
    this.location.back();
  }
}
