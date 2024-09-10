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
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ParkingLocation {
  title: string;
  imageUrl: string;
}

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

  userImage$: Observable<string>;
  userName$: Observable<string>;
  recentParking$: Observable<ParkingLocation[]>;
  favouriteParking$: Observable<ParkingLocation[]>;

  constructor(private firestore: Firestore, private storage: Storage) {}

  ngOnInit() {
    this.userImage$ = this.getUserImage();
    this.userName$ = this.getUserName();
    this.recentParking$ = this.getRecentParking();
    this.favouriteParking$ = this.getFavouriteParking();
  }

  getUserImage(): Observable<string> {
    const imageRef = ref(this.storage, 'path/to/user/image.jpg');
    return getDownloadURL(imageRef);
  }

  getUserName(): Observable<string> {
    const userDoc = doc(this.firestore, 'users/userId');
    return docData(userDoc).pipe(map((data) => data.name));
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
    return collectionData(favouriteParkingCollection) as Observable<
      ParkingLocation[]
    >;
  }
}
