import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButton,
  IonCol,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.page.html',
  styleUrls: ['./signup-login.page.scss'],
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
    RouterModule, // Import RouterModule here
  ],
})
export class SignupLoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
