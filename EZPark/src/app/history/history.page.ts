import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Import the Router module

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
  IonButtons,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonButton,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSearchbar,
    IonCard,
    IonIcon,
    IonItem,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonImg,
    RouterModule,
    IonButtons,
  ],
})
export class HistoryPage implements OnInit {
  constructor(private router: Router) {} // Declare the Router module as a property

  parkingHistory = [
    {
      imageUrl: '../assets/Themall.jpg',
      location: 'The Mall',
      date: 'May 14, 2024',
      duration: '2 hours',
    },
    {
      imageUrl: '../assets/Timessquare.jpg',
      location: 'Times Square',
      date: 'May 10, 2024',
      duration: '2 hours',
    },
    {
      imageUrl: '../assets/amanhills.jpg',
      location: 'Aman hills',
      date: 'May 17, 2024',
      duration: '2 hours',
    },
    {
      imageUrl: '../assets/mabohai.jpg',
      location: 'Mabohai',
      date: 'May 17, 2024',
      duration: '2 hours',
    },
    {
      imageUrl: '../assets/Yayasanmall.jpg',
      location: 'Yayasan Mall',
      date: 'May 17, 2024',
      duration: '2 hours',
    },
    {
      imageUrl: '../assets/Theairportmall.jpg',
      location: 'The Airport Mall',
      date: 'May 17, 2024',
      duration: '2 hours',
    },
  ];

  ngOnInit() {}

  viewReceipt(parking: any) {
    this.router.navigate(['/receipts'], { state: { parkingData: parking } }); // Use the router property to navigate
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
