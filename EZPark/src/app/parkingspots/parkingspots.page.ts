import { Component, OnInit, Inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-parkingspots',
  templateUrl: './parkingspots.page.html',
  styleUrls: ['./parkingspots.page.scss'],
  standalone: true,
  imports: [
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
export class ParkingspotsPage implements OnInit {
  favoriteParking: string[] = [];

  constructor(
    private router: Router,
    private firestore: Firestore,
    @Inject(Auth) private auth: Auth
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data() || {};
      this.favoriteParking = userData['favoriteParking'] || [];
    }
  }

  isFavorite(parkingSpot: string): boolean {
    return this.favoriteParking.includes(parkingSpot);
  }

  async toggleFavorite(event: Event, parkingSpot: string) {
    event.stopPropagation(); // Prevent event propagation
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data() || {};
      const favoriteParking = userData['favoriteParking'] || [];

      if (favoriteParking.includes(parkingSpot)) {
        // Remove from favorites
        const updatedFavorites = favoriteParking.filter(
          (spot: string) => spot !== parkingSpot
        );
        await setDoc(
          userDocRef,
          { favoriteParking: updatedFavorites },
          { merge: true }
        );
        this.favoriteParking = updatedFavorites;
      } else {
        // Add to favorites
        favoriteParking.push(parkingSpot);
        await setDoc(userDocRef, { favoriteParking }, { merge: true });
        this.favoriteParking = favoriteParking;
      }
    } else {
      console.log('User not authenticated');
    }
  }

  goToMall() {
    this.router.navigate(['/mall']);
  }
  goToAmanHills() {
    this.router.navigate(['/amanhill']);
  }
  goToAirportMall() {
    this.router.navigate(['/airportmall']);
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
