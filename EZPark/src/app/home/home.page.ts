import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButtons,
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
  IonMenuButton,
  IonButton,
  IonMenu,
  IonApp,
  IonText,
  IonGrid,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRow,
    IonButtons,
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
    IonMenuButton,
    IonButton,
    IonMenu,
    IonApp,
    IonThumbnail,
    RouterModule,
  ],
})
export class HomePage implements OnInit {
  arthurText = 'Arthur B.';
  findParkingText = 'Find Parking';
  recentParkingTitle = 'Recent Parking';
  favouriteParkingTitle = 'Favourite Parking';

  parkingLocations = [
    {
      title: 'The Mall, Gadong',
      imageUrl: '../assets/TheMall.jpg',
    },
  ];

  favouriteParking = [
    {
      title: 'The Mall, Gadong',
      imageUrl: '../assets/TheMall.jpg',
    },
    {
      title: 'Shopping Mall Badong',
      imageUrl: '../assets/ShoppingMall.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
