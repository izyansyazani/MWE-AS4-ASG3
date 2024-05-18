import { Component, OnInit } from '@angular/core';
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
  constructor(private router: Router) {}

  ngOnInit() {}

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
