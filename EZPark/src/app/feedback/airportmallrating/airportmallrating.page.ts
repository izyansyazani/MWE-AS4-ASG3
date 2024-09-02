import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-airportmallrating',
  templateUrl: './airportmallrating.page.html',
  styleUrls: ['./airportmallrating.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class AirportmallratingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  goToHome() {
    this.router.navigate(['/home']);
  }
}
