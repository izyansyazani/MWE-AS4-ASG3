import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ParkingAlertService } from '../../services/parking-alert.service';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
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
    CommonModule, // Add CommonModule here
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private firestore: Firestore,
    private parkingAlertService: ParkingAlertService
  ) {}

  async ngOnInit() {
    await this.checkBookedSpots();
  }

  async checkBookedSpots() {
    try {
      const bookingCollection = collection(this.firestore, 'bookings');
      const bookedQuery = query(
        bookingCollection,
        where('status', '==', 'booked')
      );
      const querySnapshot = await getDocs(bookedQuery);

      console.log('Query Snapshot:', querySnapshot); // Log the entire snapshot
      console.log('Number of booked spots found:', querySnapshot.docs.length);

      this.bookedSpots = querySnapshot.docs
        .map((doc, index) => {
          const docData = doc.data();
          console.log(`Doc Data [${index}]:`, docData); // Log each document's data

          // Check if 'parkingSpaceNumber' exists
          const parkingSpaceNumber = docData['parkingSpaceNumber'];
          if (parkingSpaceNumber === undefined) {
            console.warn(
              `Warning: parkingSpaceNumber is undefined for document ID: ${doc.id}`
            );
            return null; // Return null for missing values
          }

          return parkingSpaceNumber; // Return the valid parking space number
        })
        .filter((space) => space !== null); // Filter out null values

      console.log('Mapped Booked Spots:', this.bookedSpots);
    } catch (error) {
      console.error('Error fetching booked spots:', error);
    }
  }

  goToMall2() {
    this.router.navigate(['/mall2']);
  }
  goToParking() {
    this.router.navigate(['/parkingspots']);
  }
  goToBook(parkingSpaceNumber: string, parkingLevel: string) {
    if (this.bookedSpots.includes(parkingSpaceNumber)) {
      alert('This spot is already booked.');
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
