import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ParkingService } from '../parking.service';
import { Observable } from 'rxjs';
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
  parkingSpots: Observable<{ [key: string]: boolean }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    const location = this.route.snapshot.paramMap.get('location');
    this.parkingSpots = this.parkingService.getParkingSpots('mall');
  }

  goToMall2() {
    this.router.navigate(['/mall2']);
  }
  goToParking() {
    this.router.navigate(['/parkingspots']);
  }
  goToBook(parkingSpaceNumber: string) {
    this.router.navigate(['/reservation'], {
      queryParams: { parkingSpaceNumber },
    });
  }
}
