import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
export class PaymentPage implements OnInit {
  bookingDetails: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router
  ) {}

  payNow() {
    this.bookingDetails.totalAmount = this.bookingDetails.duration * 1.0;
    this.router.navigate(['/paypal'], {
      queryParams: { totalAmount: this.bookingDetails.totalAmount },
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['bookingDetails']) {
        this.bookingDetails = JSON.parse(params['bookingDetails']);
      }
    });
  }
}
