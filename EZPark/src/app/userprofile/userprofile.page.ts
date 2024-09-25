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
import { UserService } from '../services/user.service';

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
  currentUser: {
    name: string;
    email: string;
    userId: string;
    profilePicture: string | null;
  } = {
    name: '',
    email: '',
    userId: '',
    profilePicture: null,
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthServiceService,
    private userService: UserService
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
        let profileImage = this.userService.getProfileImage();
        if (profileImage instanceof ArrayBuffer) {
          // Convert ArrayBuffer to string (Base64)
          profileImage = btoa(
            String.fromCharCode(...new Uint8Array(profileImage))
          );
        }

        this.currentUser = {
          name: user.displayName || 'Anonymous',
          email: user.email || 'No email provided',
          userId: user.uid,
          profilePicture: profileImage || user.photoURL || null, // Ensure a fallback if photoURL is not present
        };
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  profileEdit() {
    this.router.navigate(['/profile-edit'], {
      state: { user: this.currentUser }, // Pass the current user data
    });
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
