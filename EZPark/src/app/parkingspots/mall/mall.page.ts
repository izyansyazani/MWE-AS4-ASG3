import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    private firestore: Firestore
  ) {}

  async ngOnInit() {
    await this.checkBookedSpots();
  }

  async checkBookedSpots() {
    // Query Firestore to get the booked spots
    const bookingCollection = collection(this.firestore, 'bookings');
    const bookedQuery = query(
      bookingCollection,
      where('status', '==', 'booked')
    );

    const querySnapshot = await getDocs(bookedQuery);
    this.bookedSpots = querySnapshot.docs.map(
      (doc) => doc.data()['parkingSpaceNumber']
    ); // Get all booked spots

    console.log('Booked spots:', this.bookedSpots);
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

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { NavController } from '@ionic/angular';
// import { ParkingService } from '../../services/parking.service';
// import { NgModule } from '@angular/core';
// import {
//   IonContent,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonRow,
//   IonButton,
//   IonCol,
//   IonSearchbar,
//   IonCard,
//   IonIcon,
//   IonItem,
//   IonCardContent,
//   IonCardTitle,
//   IonCardSubtitle,
//   IonCardHeader,
//   IonImg,
//   IonLabel,
//   IonGrid,
//   IonButtons,
//   IonBackButton,
// } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-mall',
//   templateUrl: './mall.page.html',
//   styleUrls: ['./mall.page.scss'],
//   standalone: true,
//   imports: [
//     IonContent,
//     IonHeader,
//     IonTitle,
//     IonToolbar,
//     IonRow,
//     IonButton,
//     IonCol,
//     IonSearchbar,
//     IonCard,
//     IonIcon,
//     IonItem,
//     IonCardContent,
//     IonCardTitle,
//     IonCardSubtitle,
//     IonCardHeader,
//     IonImg,
//     IonLabel,
//     IonGrid,
//     IonButtons,
//     IonBackButton,
//   ],
// })
// export class MallPage implements OnInit {
//   takenSpots: { [key: string]: boolean } = {};

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private navCtrl: NavController,
//     public parkingService: ParkingService
//   ) {}

//   ngOnInit() {
//     this.parkingService.spots$.subscribe((spots) => {
//       this.takenSpots = spots;
//     });
//   }

//   goToMall2() {
//     this.router.navigate(['/mall2']);
//   }
//   goToParking() {
//     this.router.navigate(['/parkingspots']);
//   }
//   goToBook(parkingSpaceNumber: string) {
//     if (!this.takenSpots[parkingSpaceNumber]) {
//       this.router.navigate(['/reservation'], {
//         queryParams: { parkingSpaceNumber },
//       });
//     }
//   }
// }
