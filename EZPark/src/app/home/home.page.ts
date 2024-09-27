import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule, Router } from '@angular/router';
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
  findParkingText = 'Find Parking';
  favouriteParkingTitle = 'Favourite Parking';

  recentParking$: Observable<ParkingLocation[]> | undefined;
  favouriteParking$: Observable<ParkingLocation[]> | undefined;
  favoriteParkingSpots: string[] = []; // Holds the IDs/names of favorite spots
  favoriteSpots: ParkingLocation[] = []; // Holds the current favorite spots

  constructor(
    private firestore: Firestore,
    private favoriteService: FavoriteService,
    private router: Router
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
                  title: 'The Mall Gadong',
                  location: 'The Mall, Gadong',
                  imageUrl: '../assets/Themall.jpg',
                };
              case 'Times Square':
                return {
                  title: 'Times Square',
                  location: 'Times Square',
                  imageUrl: '../assets/Timessquare.jpg',
                };
              case 'Airport Mall':
                return {
                  title: 'The Airport Mall',
                  location: 'Airport Mall',
                  imageUrl: '../assets/Theairportmall.jpg',
                };
              case 'Yayasan Complex':
                return {
                  title: 'Yayasan Complex',
                  location: 'Yayasan Complex',
                  imageUrl: '../assets/Yayasanmall.jpg',
                };
              case 'Mabohai Shopping Complex':
                return {
                  title: 'Mabohai Shopping Complex',
                  location: 'Mabohai Shopping Complex',
                  imageUrl: '../assets/mabohai.jpg',
                };
              case 'Aman Hills Brunei':
                return {
                  title: 'Aman Hills Brunei',
                  location: 'Aman Hills Brunei',
                  imageUrl: '../assets/amanhills.jpg',
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
    const spot = this.getSpotByName(mallName);
    if (spot) {
      const index = this.favoriteSpots.findIndex(
        (fav) => fav.location === mallName
      );
      if (index > -1) {
        this.favoriteSpots.splice(index, 1);
      } else {
        this.favoriteSpots.push(spot);
      }
    }
  }

  isFavorite(location: string): boolean {
    return this.favoriteSpots.some((spot) => spot.location === location);
  }

  getSpotByName(name: string): ParkingLocation | null {
    const spots = [
      {
        title: 'Shopping Mall Gadong',
        location: 'The Mall, Gadong',
        imageUrl: '../assets/Themall.jpg',
      },
      {
        title: 'Times Square',
        location: 'Times Square',
        imageUrl: '../assets/Timessquare.jpg',
      },
      {
        title: 'The Airport Mall',
        location: 'Airport Mall',
        imageUrl: '../assets/Theairportmall.jpg',
      },
      {
        title: 'Yayasan Complex',
        location: 'Yayasan Complex',
        imageUrl: '../assets/Yayasanmall.jpg',
      },
      {
        title: 'Mabohai Shopping Complex',
        location: 'Mabohai Shopping Complex',
        imageUrl: '../assets/mabohai.jpg',
      },
      {
        title: 'Aman Hills Brunei',
        location: 'Aman Hills Brunei',
        imageUrl: '../assets/amanhills.jpg',
      },
    ];

    return spots.find((spot) => spot.location === name) || null;
  }

  navigateToPage(mallName: string) {
    switch (mallName) {
      case 'The Mall, Gadong':
        this.router.navigate(['/mall']);
        break;
      case 'Times Square':
        this.router.navigate(['/timessquare']);
        break;
      case 'Airport Mall':
        this.router.navigate(['/airportmall']);
        break;
      case 'Yayasan Complex':
        this.router.navigate(['/yayasan']);
        break;
      case 'Mabohai Shopping Complex':
        this.router.navigate(['/mabohai']);
        break;
      case 'Aman Hills Brunei':
        this.router.navigate(['/amanhill']);
        break;
      default:
        break;
    }
  }

  removeFavorite(location: string) {
    this.favoriteSpots = this.favoriteSpots.filter(
      (spot) => spot.location !== location
    );
  }
}
