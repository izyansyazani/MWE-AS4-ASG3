import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {
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
  IonAccordionGroup,
  IonAccordion,
} from '@ionic/angular/standalone';

import { FavoriteService } from '../services/favorite.service'; // Adjust the import path

interface ParkingLocation {
  title: string;
  location: string;
  imageUrl: string;
  rate: number; // Added property
  freeSpace?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonAccordionGroup,
    IonAccordion,
  ],
})
export class HomePage implements OnInit {
  arthurText = 'Arthur B.';
  findParkingText = 'Find Parking';
  recentParkingTitle = 'Recent Parking';
  favouriteParkingTitle = 'Favourite Parking';

  recentParking$: Observable<ParkingLocation[]> | undefined;
  favouriteParking$: Observable<ParkingLocation[]> | undefined;
  favoriteParkingSpots: string[] = []; // Holds the IDs/names of favorite spots

  constructor(
    private firestore: Firestore,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.recentParking$ = this.getRecentParking();
    this.favouriteParking$ = this.getFavouriteParking();

    // Subscribe to favorite parking spots
    this.favoriteService.favoriteParkingSpots$.subscribe((favorites) => {
      this.favoriteParkingSpots = favorites;
    });

    console.log('HomePage initialized');
  }

  getRecentParking(): Observable<ParkingLocation[]> {
    const recentParkingCollection = collection(this.firestore, 'recentParking');
    return collectionData(recentParkingCollection) as Observable<
      ParkingLocation[]
    >;
  }

  getFavouriteParking(): Observable<ParkingLocation[]> {
    const favouriteParkingCollection = collection(
      this.firestore,
      'favouriteParking'
    );
    return collectionData(favouriteParkingCollection).pipe(
      map((data: any[]) => {
        return data
          .map((spot: any) => {
            switch (spot.name) {
              case 'The Mall, Gadong':
                return {
                  title: 'Shopping Mall Gadong',
                  location: 'The Mall, Gadong',
                  imageUrl: '../assets/Themall.jpg',
                  rate: 2, // Hardcoded rate
                  freeSpace: 24,
                };
              case 'Times Square':
                return {
                  title: 'Times Square',
                  location: 'Times Square',
                  imageUrl: '../assets/Timessquare.jpg',
                  rate: 2, // Hardcoded rate
                  freeSpace: 20,
                };
              case 'Airport Mall':
                return {
                  title: 'The Airport Mall',
                  location: 'Airport Mall',
                  imageUrl: '../assets/Theairportmall.jpg',
                  rate: 2, // Hardcoded rate
                  freeSpace: 30,
                };
              case 'Yayasan Complex':
                return {
                  title: 'Yayasan Complex',
                  location: 'Yayasan Complex',
                  imageUrl: '../assets/Yayasanmall.jpg',
                  rate: 2, // Hardcoded rate
                  freeSpace: 15,
                };
              case 'Mabohai Shopping Complex':
                return {
                  title: 'Mabohai Shopping Complex',
                  location: 'Mabohai Shopping Complex',
                  imageUrl: '../assets/mabohai.jpg',
                  rate: 2, // Hardcoded rate
                  freeSpace: 10,
                };
              case 'Aman Hills Brunei':
                return {
                  title: 'Aman Hills Brunei',
                  location: 'Aman Hills Brunei',
                  imageUrl: '../assets/amanhills.jpg',
                  rate: 2, // Hardcoded rate
                  freeSpace: 12,
                };
              default:
                return null;
            }
          })
          .filter((spot: ParkingLocation | null) => spot !== null);
      })
    ) as Observable<ParkingLocation[]>;
  }

  toggleFavorite(mallName: string) {
    console.log(`${mallName} favorite toggled`);
    // Add your logic to handle the favorite toggle here
  }
}
