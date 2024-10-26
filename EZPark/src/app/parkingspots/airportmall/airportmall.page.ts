import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  selector: 'app-airportmall',
  templateUrl: './airportmall.page.html',
  styleUrls: ['./airportmall.page.scss'],
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
export class AirportmallPage implements OnInit {
  fromFavorites: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Subscribe to query params to check navigation source
    this.route.queryParams.subscribe((params) => {
      this.fromFavorites = params['fromFavorites'] === 'true';
      console.log('Navigated from favorites:', this.fromFavorites);
    });
  }

  // Handle back button action
  goBack() {
    if (this.fromFavorites) {
      this.navCtrl.navigateBack('/homepage'); // Navigate to homepage if from favorites
    } else {
      this.navCtrl.back(); // Default back action
    }
  }

  goToParking() {
    this.router.navigate(['/parkingspots']);
  }

  goToBook(parkingSpaceNumber: string, parkingLevel: string) {
    this.router.navigate(['/reservation'], {
      queryParams: {
        parkingSpaceNumber,
        parkingLevel,
        imageUrl: '../assets/airportmall.jpg',
        label: 'Airport Mall',
      },
    });
  }
}
