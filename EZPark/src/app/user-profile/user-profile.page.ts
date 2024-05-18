import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButtons,
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
  IonList,
  IonRouterLink,
  IonFooter,
  IonAvatar,
  IonBackButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCol,
    IonButtons,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
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
    IonList,
    IonRouterLink,
    IonFooter,
    IonAvatar,
    IonBackButton,
    RouterModule,
  ],
})
export class UserprofilePage implements OnInit {
  profile = {
    name: 'Arthur B',
    email: 'arthur.b@gmail.com',
    phone: '+973 800 8000',
    image: 'assets/profile-pic.jpg',
    payment: '**** **** **** 1234',
    notification: 'Enabled',
    security: 'High',
  };

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}
  goToHome() {
    this.router.navigate(['/home']);
  }

  editProfile() {
    this.router.navigate(['/userprofile']);
  }

  parkingHistory() {
    this.router.navigate(['/history']);
  }

  aboutUs() {
    this.router.navigate(['/aboutus']);
  }

  feedback() {
    this.router.navigate(['/feedback']);
  }

  logout() {
    this.alertController
      .create({
        header: 'Confirm Logout',
        message: 'Are you sure you want to logout?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Logout',
            handler: () => {
              this.router.navigate(['/signup-login']);
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
