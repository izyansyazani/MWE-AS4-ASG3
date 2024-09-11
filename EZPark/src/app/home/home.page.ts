import { Component, OnInit, Inject } from '@angular/core';
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
import { CommonModule, AsyncPipe } from '@angular/common';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';

interface ParkingLocation {
  title: string;
  subtitle: string;
  imageUrl: string;
  freeSpace: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
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

  userImage$: Observable<string> | undefined;
  userName$: Observable<string> | undefined;
  recentParking$: Observable<ParkingLocation[]> | undefined;
  favouriteParking$: Observable<ParkingLocation[]> | undefined;

  constructor(
    private firestore: Firestore,
    private storage: Storage,
    @Inject(Auth) private auth: Auth
  ) {}

  ngOnInit() {
    this.userImage$ = this.getUserImage();
    this.userName$ = this.getUserName();
    this.recentParking$ = this.getRecentParking();
    this.favouriteParking$ = this.getFavouriteParking();
    console.log('HomePage initialized'); // Add this line
  }

  getUserImage(): Observable<string> {
    const imageRef = ref(this.storage, 'path/to/user/image.jpg');
    return from(getDownloadURL(imageRef));
  }

  getUserName(): Observable<string> {
    const userDoc = doc(this.firestore, 'users/userId');
    return docData(userDoc).pipe(map((data) => data?.['name'] ?? ''));
  }

  getRecentParking(): Observable<ParkingLocation[]> {
    const recentParkingCollection = collection(this.firestore, 'recentParking');
    return collectionData(recentParkingCollection) as Observable<
      ParkingLocation[]
    >;
  }

  getFavouriteParking(): Observable<ParkingLocation[]> {
    const user = this.auth.currentUser;
    if (user) {
      const userDoc = doc(this.firestore, `users/${user.uid}`);
      return docData(userDoc).pipe(
        map((data: any) => {
          console.log('Fetched user data:', data); // Add this line
          const favoriteParking = data['favoriteParking'] || [];
          return favoriteParking
            .map((spot: string) => {
              // Map the parking spot to the corresponding data
              switch (spot) {
                case 'The Mall, Gadong':
                  return {
                    title: 'Shopping Mall Gadong',
                    subtitle: 'The Mall, Gadong',
                    imageUrl: '../assets/Themall.jpg',
                    freeSpace: 24,
                  };
                case 'Times Square':
                  return {
                    title: 'Times Square',
                    subtitle: 'Times Square',
                    imageUrl: '../assets/Timessquare.jpg',
                    freeSpace: 20,
                  };
                case 'Airport Mall':
                  return {
                    title: 'The Airport Mall',
                    subtitle: 'Airport Mall',
                    imageUrl: '../assets/Theairportmall.jpg',
                    freeSpace: 30,
                  };
                case 'Yayasan Complex':
                  return {
                    title: 'Yayasan Complex',
                    subtitle: 'Yayasan Complex',
                    imageUrl: '../assets/Yayasanmall.jpg',
                    freeSpace: 20,
                  };
                case 'Mabohai Shopping Complex':
                  return {
                    title: 'Mabohai Shopping Complex',
                    subtitle: 'Mabohai Shopping Complex',
                    imageUrl: '../assets/mabohai.jpg',
                    freeSpace: 15,
                  };
                case 'Aman Hills Brunei':
                  return {
                    title: 'Aman Hills Basement',
                    subtitle: 'Aman Hills Shopping Centre',
                    imageUrl: '../assets/amanhills.jpg',
                    freeSpace: 25,
                  };
                default:
                  return null;
              }
            })
            .filter((spot: ParkingLocation | null) => spot !== null);
        })
      );
    } else {
      return new Observable<ParkingLocation[]>((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  }
}
