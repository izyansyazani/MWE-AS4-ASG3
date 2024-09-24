import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonIcon,
  IonItem,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonLabel,
  IonList,
  IonFooter,
  IonAvatar,
} from '@ionic/angular/standalone';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonIcon,
    IonItem,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonLabel,
    IonList,
    IonFooter,
    IonAvatar,
  ],
})
export class UserprofilePage implements OnInit {
  currentUser = {
    name: '',
    email: '',
    userId: '',
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  ionViewWillEnter() {
    this.loadCurrentUser();
  }

  // Fetch the current user's profile
  async loadCurrentUser() {
    try {
      const user = await this.authService.getProfile();
      if (user) {
        this.currentUser.name = user.displayName || 'Anonymous';
        this.currentUser.email = user.email || 'No email provided'; // Added email assignment
        this.currentUser.userId = user.uid;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  profileEdit() {
    console.log('Edit Profile button clicked');
    this.router.navigate(['/profile-edit']);
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

  goToHome() {
    this.router.navigate(['/home']);
  }
}
