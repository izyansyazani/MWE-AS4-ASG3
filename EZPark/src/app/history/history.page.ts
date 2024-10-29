import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Import the Router module
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
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
  IonButtons,
} from '@ionic/angular/standalone';

// Define the Parking interface
interface Parking {
  id: any;
  location: string;
  parkingLevel: string;
  parkingSpaceNumber: string;
  reservationDate: string;
  reservationTime: string;
  carLicenseNumber: string;
  totalAmount: number;
  date: string;
  duration: string;
  imageUrl: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonButton,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonImg,
    IonButtons,
  ],
})
export class HistoryPage implements OnInit {
  parkingHistory: Parking[] = [
    // Your parking history data here
  ];

  searchTerm: string = ''; // Add search term property

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {
    this.loadParkingHistory();
  }

  async loadParkingHistory() {
    const bookingsCollection = collection(this.firestore, 'bookings');
    const bookingSnapshot = await getDocs(bookingsCollection);
    this.parkingHistory = bookingSnapshot.docs.map((doc) => {
      const data = doc.data();
      const bookingDetails = data['bookingDetails'] || {};
      return {
        id: doc.id, // Store the document ID if needed
        location: data['location'],
        parkingLevel: bookingDetails['parkingLevel'],
        parkingSpaceNumber: bookingDetails['parkingSpaceNumber'],
        reservationDate: bookingDetails['reservationDate'],
        reservationTime: bookingDetails['reservationTime'],
        carLicenseNumber: bookingDetails['carLicenseNumber'],
        totalAmount: bookingDetails['totalAmount'],
        date: new Date(data['timestamp'].seconds * 1000).toLocaleDateString(), // Format timestamp to date
        duration: bookingDetails['duration'],
        imageUrl: data['imageUrl'] || '',
      };
    });
  }

  viewReceipt(parking: Parking) {
    console.log('Navigating to receipts with ID:', parking.id);
    this.router.navigate(['/receipts'], {
      queryParams: {
        id: parking.id,
        location: parking.location,
        parkingLevel: parking.parkingLevel,
        parkingSpaceNumber: parking.parkingSpaceNumber,
        reservationDate: parking.reservationDate,
        reservationTime: parking.reservationTime,
        carLicenseNumber: parking.carLicenseNumber,
        totalAmount: parking.totalAmount,
        date: parking.date,
        duration: parking.duration,
      },
    }); // Pass all relevant data as query parameters
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  // Method to filter parking history based on search term
  get filteredParkingHistory(): Parking[] {
    if (!this.searchTerm.trim()) {
      return this.parkingHistory;
    }
    return this.parkingHistory.filter(
      (parking) =>
        parking.location
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        parking.date.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        parking.duration.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
