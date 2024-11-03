import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { getDatabase, ref, get, child } from '@angular/fire/database';
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
  IonGrid,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-mall',
  templateUrl: './mall.page.html',
  styleUrls: ['./mall.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    IonGrid,
    IonButtons,
    IonBackButton,
  ],
})
export class MallPage implements OnInit {
  bookedSpots: string[] = [];
  fromFavorites: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    await this.checkBookedSpots();
    await this.checkOccupiedSpots();
    // Subscribe to query params to check navigation source
    this.route.queryParams.subscribe((params) => {
      this.fromFavorites = params['fromFavorites'] === 'true';
      console.log('Navigated from favorites:', this.fromFavorites);
    });
  }

  async checkBookedSpots() {
    try {
      const bookingCollection = collection(this.firestore, 'bookings');
      const bookedQuery = query(
        bookingCollection,
        where('status', '==', 'booked')
      );
      const bookedSnapshot = await getDocs(bookedQuery);

      // Add booked spots from Firestore to bookedSpots array
      bookedSnapshot.docs.forEach((doc) => {
        const parkingSpaceNumber = doc.data()['parkingSpaceNumber'];
        if (
          parkingSpaceNumber &&
          !this.bookedSpots.includes(parkingSpaceNumber)
        ) {
          this.bookedSpots.push(parkingSpaceNumber);
        }
      });
    } catch (error) {
      console.error('Error fetching booked spots from Firestore:', error);
    }
  }

  async checkOccupiedSpots() {
    try {
      const database = getDatabase(); // Initialize Realtime Database
      const parkingSpotsRef = ref(database, 'parking-spots');
      const snapshot = await get(child(parkingSpotsRef, '/'));

      // Check each parking spot's status
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.keys(data).forEach((spot) => {
          if (data[spot].parking_status === 'Occupied') {
            console.log(`Occupied Spot Detected: ${spot}`);
            if (!this.bookedSpots.includes(spot)) {
              this.bookedSpots.push(spot); // Add to bookedSpots if occupied
            }
          }
        });
      }
    } catch (error) {
      console.error(
        'Error fetching occupied spots from Realtime Database:',
        error
      );
    }
  }

  // Handle back button action on back button click
  goBack() {
    if (this.fromFavorites) {
      this.navCtrl.navigateBack('/homepage'); // Navigate to homepage if from favorites
    } else {
      this.navCtrl.back(); // Default back action
    }
  }

  goToMall2() {
    this.router.navigate(['/mall2']);
  }

  goToParking() {
    this.router.navigate(['/parkingspots']);
  }

  goToBook(parkingSpaceNumber: string, parkingLevel: string) {
    if (this.isBooked(parkingSpaceNumber)) {
      alert('This spot is already booked or occupied.');
      return;
    }
    this.router.navigate(['/reservation'], {
      queryParams: {
        parkingSpaceNumber,
        parkingLevel,
        imageUrl: '../assets/Themall.jpg',
        label: 'The Mall, Gadong',
      },
    });
  }

  isBooked(spot: string): boolean {
    return this.bookedSpots.includes(spot);
  }
}
