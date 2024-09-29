import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  ViewWillEnter,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-parkingspots',
  templateUrl: './parkingspots.page.html',
  styleUrls: ['./parkingspots.page.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    CommonModule,
    FormsModule,
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
export class ParkingspotsPage implements OnInit, ViewWillEnter {
  parkingSpots: { name: string }[] = [
    { name: 'The Mall, Gadong' },
    { name: 'Times Square' },
    { name: 'Airport Mall' },
    { name: 'Yayasan Complex' },
    { name: 'Mabohai Shopping Complex' },
    { name: 'Aman Hills Brunei' },
  ];

  constructor(
    private router: Router,
    private firestore: Firestore,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data() || {};
      this.cdr.detectChanges(); // Ensure change detection
    }
  }

  goToMall() {
    this.router.navigate(['/mall']);
  }
  goToAmanHills() {
    this.router.navigate(['/amanhill']);
  }
  goToYayasan() {
    this.router.navigate(['/yayasan']);
  }
  goToMabohai() {
    this.router.navigate(['/mabohai']);
  }
  goToTimesSquare() {
    this.router.navigate(['/timessquare']);
  }
  goToAirportMall() {
    this.router.navigate(['/airportmall']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
