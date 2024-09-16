import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import {
  Firestore,
  doc,
  collection,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
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
} from '@ionic/angular/standalone';

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

  constructor(private firestore: Firestore, private storage: Storage) {}

  ngOnInit() {
    this.userImage$ = this.getUserImage();
    this.userName$ = this.getUserName();
    this.recentParking$ = this.getRecentParking();
    this.favouriteParking$ = this.getFavouriteParking();
    console.log('HomePage initialized');
  }

  getUserImage(): Observable<string> {
    const imageRef = ref(this.storage, `path/to/user/image.jpg`);
    return from(getDownloadURL(imageRef));
  }

  getUserName(): Observable<string> {
    const userDoc = doc(this.firestore, `users/userId`);
    return docData(userDoc).pipe(map((data: any) => data?.['name'] ?? ''));
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
                  freeSpace: 15,
                };
              case 'Mabohai Shopping Complex':
                return {
                  title: 'Mabohai Shopping Complex',
                  subtitle: 'Mabohai Shopping Complex',
                  imageUrl: '../assets/mabohai.jpg',
                  freeSpace: 10,
                };
              case 'Aman Hills Brunei':
                return {
                  title: 'Aman Hills Brunei',
                  subtitle: 'Aman Hills Brunei',
                  imageUrl: '../assets/amanhills.jpg',
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
}