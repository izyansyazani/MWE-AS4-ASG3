import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.page.html',
  styleUrls: ['./parking-spot.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ParkingSpotPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
