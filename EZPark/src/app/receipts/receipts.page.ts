import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Firestore, collection, getDoc, doc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
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

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

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
    });
  }
}
