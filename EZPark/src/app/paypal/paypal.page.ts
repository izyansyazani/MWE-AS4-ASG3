import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayPalService } from '../paypal.service';
import { NavController } from '@ionic/angular';
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
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';

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
  label: string = '';

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private payment: PayPalService,
    private navCtrl: NavController,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['bookingDetails']) {
        this.bookingDetails = JSON.parse(params['bookingDetails']);
      }
      this.label = params['label'] || '';
    });
    this.route.queryParams.subscribe((params) => {
      if (params['totalAmount']) {
        this.totalAmount = parseFloat(params['totalAmount']) || 0;
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
        onApprove: async (data: any, actions: any) => {
          return actions.order.capture().then(async (details: any) => {
            if (details.status === 'COMPLETED') {
              try {
                await addDoc(collection(this.firestore, 'bookings'), {
                  location: this.label,
                  bookingDetails: this.bookingDetails,
                  paymentDetails: details,
                  status: 'booked',
                  timestamp: new Date(),
                  parkingSpaceNumber: this.bookingDetails.parkingSpaceNumber,
                  duration: this.bookingDetails.duration,
                });
                alert('Payment is successful and details are saved');
              } catch (error) {
                console.error('Error saving details: ', error);
                alert(
                  'Payment successful, but there was an error saving the details'
                );
              }
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
  async simulatePayment() {
    const mockDetails = {
      status: 'COMPLETED',
      id: 'MOCK_PAYMENT_ID',
      payer: {
        email_address: 'mockpayer@example.com',
      },
      purchase_units: [
        {
          amount: {
            value: this.bookingDetails.totalAmount.toString(),
            currency_code: 'SGD',
          },
        },
      ],
    };

    try {
      await addDoc(collection(this.firestore, 'bookings'), {
        location: this.label,
        bookingDetails: this.bookingDetails,
        paymentDetails: mockDetails,
        status: 'booked',
        timestamp: new Date(),
        parkingSpaceNumber: this.bookingDetails.parkingSpaceNumber,
        duration: this.bookingDetails.duration,
      });
      alert('Simulated payment is successful and details are saved');
    } catch (error) {
      console.error('Error saving simulated details: ', error);
      alert(
        'Simulated payment successful, but there was an error saving the details'
      );
    }

    this.navCtrl.navigateRoot('/home');
  }
}
