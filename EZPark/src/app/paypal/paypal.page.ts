import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayPalService } from '../paypal.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
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
    IonGrid,
    IonButtons,
    IonBackButton,
    IonList,
    IonDatetime,
    IonInput,
    CommonModule,
    FormsModule,
  ],
})
export class PaypalPage implements OnInit {
  totalAmount: number = 0;
  bookingDetails: any;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private payment: PayPalService,
    private navCtrl: NavController,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['bookingDetails']) {
        this.bookingDetails = JSON.parse(params['bookingDetails']);
      }
    });
    this.route.queryParams.subscribe((params) => {
      if (params['totalAmount']) {
        this.totalAmount = parseFloat(params['totalAmount']);
      }
    });

    window['paypal']
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.bookingDetails.totalAmount.toString(),
                  currency_code: 'SGD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            if (details.status === 'COMPLETED') {
              console.log('Payment Details: ', details);
              console.log('Reservation Details: ', this.bookingDetails);

              this.firestore.collection('reservations').add({
                name: this.bookingDetails.name,
                phoneNumber: this.bookingDetails.phoneNumber,
                parkingLevel: this.bookingDetails.parkingLevel,
                parkingSpot: this.bookingDetails.parkingSpot,
                reservationDate: this.bookingDetails.reservationDate,
                reservationTime: this.bookingDetails.reservationTime,
                duration: this.bookingDetails.duration,
                totalAmount: this.bookingDetails.totalAmount,
                paymentDetails: details,
              });
              alert('Payment is successful');
              this.navCtrl.navigateRoot('/home');
            }
          });
        },
        onError: (error: any) => {
          console.log(error);
        },
      })
      .render(this.paymentRef.nativeElement);
  }
}
