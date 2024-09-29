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
import { ParkingService } from '../services/parking.service';
import { AuthServiceService } from '../services/auth-service.service';

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
    private parkingService: ParkingService,
    private authService: AuthServiceService
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

    this.initializePayPalButtons();
  }

  private initializePayPalButtons() {
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
          const details = await actions.order.capture();
          if (details.status === 'COMPLETED') {
            console.log('Payment Details: ', details);
            console.log('Reservation Details: ', this.bookingDetails);

            const user = await this.authService.getProfile(); // Ensure you have access to AuthService
            if (user) {
              const paymentDetails = {
                orderId: details.id,
                amount: this.bookingDetails.totalAmount,
                currency: 'SGD',
                status: details.status,
                reservationDetails: this.bookingDetails,
              };
              await this.authService.savePaymentDetails(
                user.uid,
                paymentDetails
              );
            }
            alert('Payment is successful. Your booking has been confirmed.');

            // Navigate to booking history after payment
            this.router.navigate(['/booking-history']);
          }
        },
        onError: (error: any) => {
          console.log(error);
        },
      })
      .render(this.paymentRef.nativeElement);
  }
}

// ngOnInit() {
//   this.route.queryParams.subscribe((params) => {
//     if (params['bookingDetails']) {
//       this.bookingDetails = JSON.parse(params['bookingDetails']);
//     }
//     this.label = params['label'] || '';
//   });
//   this.route.queryParams.subscribe((params) => {
//     if (params['totalAmount']) {
//       this.totalAmount = parseFloat(params['totalAmount']) || 0;
//     }
//   });

//   window['paypal']
//     .Buttons({
//       style: {
//         layout: 'horizontal',
//         color: 'blue',
//         shape: 'rect',
//         label: 'paypal',
//       },
//       createOrder: (data: any, actions: any) => {
//         return actions.order.create({
//           purchase_units: [
//             {
//               amount: {
//                 value: this.bookingDetails.totalAmount.toString(),
//                 currency_code: 'SGD',
//               },
//             },
//           ],
//         });
//       },
//       onApprove: (data: any, actions: any) => {
//         return actions.order.capture().then((details: any) => {
//           if (details.status === 'COMPLETED') {
//             console.log('Payment Details: ', details);
//             console.log('Reservation Details: ', this.bookingDetails);

//             alert('Payment is successful');
//             this.navCtrl.navigateRoot('/home');
//           }
//         });
//       },
//       onError: (error: any) => {
//         console.log(error);
//       },
//     })
//     .render(this.paymentRef.nativeElement);
// }
