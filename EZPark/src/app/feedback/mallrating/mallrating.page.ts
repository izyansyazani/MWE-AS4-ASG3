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
  selector: 'app-mallrating',
  templateUrl: './mallrating.page.html',
  styleUrls: ['./mallrating.page.scss'],
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
export class MallratingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  goToHome() {
    this.router.navigate(['/home']);
  }
}
