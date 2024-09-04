import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Angular Router
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

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
  // AlertController,
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
  ],
})
export class UserprofilePage implements OnInit {
  profile = {
    name: 'Arthur B',
    email: 'arthur.b@gmail.com',
    phone: '+973 800 8000',
    image: 'assets/profile-pic.jpg', // Adjust the path to your image asset
    payment: '**** **** **** 1234', // Masked card number
    notification: 'Enabled',
    security: 'High',
  };

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {} // Inject Router

  ngOnInit() {}

  editProfile() {
    this.router.navigate(['/userprofile']); // Define the route for editing profile
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
            handler: () => {}, // Empty handler for cancel
          },
          {
            text: 'Logout',
            handler: () => {
              // Handle logout logic here (e.g., clear session data)
              this.router.navigate(['/signup-login']); // Navigate to signup page after confirmation
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
