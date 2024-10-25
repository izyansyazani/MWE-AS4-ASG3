import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule, Router } from '@angular/router';
import { ParkingAlertService } from '../services/parking-alert.service';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
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
import { AuthServiceService } from '../services/auth-service.service'; // Adjust the import path

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
export class HomePage implements OnInit, OnDestroy {
  findParkingText = 'Find Parking';
  favouriteParkingTitle = 'Favourite Parking';

  recentParking$: Observable<ParkingLocation[]> | undefined;
  favouriteParking$: Observable<ParkingLocation[]> | undefined;
  favoriteParkingSpots: string[] = []; // Holds the IDs/names of favorite spots
  favoriteSpots: ParkingLocation[] = []; // Holds the current favorite spots
  private favoriteSpotsSubscription: Subscription | undefined;

  constructor(
    private firestore: Firestore,
    private favoriteService: FavoriteService,
    private authService: AuthServiceService,
    private router: Router,
    private parkingAlertService: ParkingAlertService
  ) {}

  ngOnInit() {
    this.recentParking$ = this.getRecentParking();
    this.favouriteParking$ = this.getFavouriteParking();

    // Subscribe to favorite parking spots
    this.favoriteService.favoriteParkingSpots$.subscribe((favorites) => {
      this.favoriteParkingSpots = favorites;
    });

    this.loadFavoriteSpots();

    console.log('HomePage initialized');
  }

  ngOnDestroy() {
    // Unsubscribe from the favorite spots subscription when the component is destroyed
    if (this.favoriteSpotsSubscription) {
      this.favoriteSpotsSubscription.unsubscribe();
    }
  }

  loadFavoriteSpots() {
    this.authService.getProfile().then((user) => {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      console.log(`Loading favorite spots for user: ${user.uid}`);

      // Clear previous favorites
      this.favoriteSpots = [];

      // Access the user-specific favorites
      const favoriteParkingCollection = collection(
        this.firestore,
        `users/${user.uid}/favoriteParking`
      );
      this.favoriteSpotsSubscription = collectionData(
        favoriteParkingCollection
      ).subscribe(
        (favorites: any[]) => {
          this.favoriteSpots = favorites.map((fav) => ({
            title: fav.title,
            location: fav.location,
            imageUrl: fav.imageUrl,
          }));
          console.log('Favorite spots loaded:', this.favoriteSpots);
        },
        (error) => {
          console.error('Error loading favorite spots: ', error);
        }
      );
    });
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
    this.authService.getProfile().then((user) => {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const spot = this.getSpotByName(mallName);
      if (spot) {
        const index = this.favoriteSpots.findIndex(
          (fav) => fav.location === mallName
        );
        if (index > -1) {
          // If it's already a favorite, remove it
          this.favoriteSpots.splice(index, 1);
          this.removeFavoriteParking(user.uid, mallName); // Use the service to remove
        } else {
          // If it's not a favorite, add it
          this.favoriteSpots.push(spot);
          this.addFavoriteParking(user.uid, mallName, spot); // Use the service to add
        }
      }
    });
  }

  addFavoriteParking(userId: string, mallName: string, spot: ParkingLocation) {
    const favoriteParkingDocRef = doc(
      this.firestore,
      `users/${userId}/favoriteParking/${mallName}` // This path should be correct
    );
    setDoc(favoriteParkingDocRef, spot)
      .then(() => {
        console.log(
          `Added ${mallName} to favorite parking for user: ${userId}`
        );
        this.favoriteService.addFavorite(mallName); // Optionally update local favorite list
      })
      .catch((error: any) => {
        console.error('Error adding favorite parking: ', error);
      });
  }

  removeFavoriteParking(userId: string, mallName: string) {
    const favoriteParkingDocRef = doc(
      this.firestore,
      `users/${userId}/favoriteParking/${mallName}`
    );
    deleteDoc(favoriteParkingDocRef)
      .then(() => {
        console.log(
          `Removed ${mallName} from favorite parking for user: ${userId}`
        );
        this.favoriteService.removeFavorite(mallName); // Update local favorite list
      })
      .catch((error: any) => {
        console.error('Error removing favorite parking: ', error);
      });
  }

  isFavorite(location: string): boolean {
    return this.favoriteSpots.some((spot) => spot.location === location);
  }

  checkIfFavorite(location: string): void {
    this.authService.getProfile().then((user) => {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      const favoriteParkingCollection = collection(
        this.firestore,
        `users/${user.uid}/favoriteParking`
      );
      collectionData(favoriteParkingCollection).subscribe(
        (favorites: any[]) => {
          const isFavorite = favorites.some((fav) => fav.location === location);
          console.log(`Is ${location} a favorite?`, isFavorite);
        },
        (error) => {
          console.error('Error checking if favorite: ', error);
        }
      );
    });
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

  removeFavorite(location: string) {
    this.authService.getProfile().then((user) => {
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      this.favoriteSpots = this.favoriteSpots.filter(
        (spot) => spot.location !== location
      );
      const favoriteParkingCollection = collection(
        this.firestore,
        `users/${user.uid}/favoriteParking`
      );
      const favoriteParkingDoc = doc(favoriteParkingCollection, location);
      deleteDoc(favoriteParkingDoc)
        .then(() => {
          console.log(`Removed ${location} from favorite parking`);
        })
        .catch((error: any) => {
          console.error('Error removing favorite parking: ', error);
        });
    });
  }

  getReserveLink(location: string): string {
    switch (location) {
      case 'The Mall, Gadong':
        return '/mall';
      case 'Times Square':
        return '/timessquare';
      case 'Airport Mall':
        return '/airportmall';
      case 'Yayasan Complex':
        return '/yayasan';
      case 'Mabohai Shopping Complex':
        return '/mabohai';
      case 'Aman Hills Brunei':
        return '/amanhill';
      default:
        return '/';
    }
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.favoriteSpots = []; // Clear favorite spots on logout
      console.log('User signed out');
    });
  }
}
