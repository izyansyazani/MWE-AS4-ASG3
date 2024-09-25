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

// Define the Parking interface
interface Parking {
  location: string;
  date: string;
  duration: string;
  imageUrl: string;
}

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
    RouterModule,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonImg,
    IonButtons,
  ],
})
export class HistoryPage implements OnInit {
  parkingHistory: Parking[] = [
    // Your parking history data here
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialization logic here
  }

  viewReceipt(parking: Parking) {
    // Logic to view receipt
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}