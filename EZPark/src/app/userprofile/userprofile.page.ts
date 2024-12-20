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
    phoneNumber: string;
  } = {
    name: '',
    email: '',
    userId: '',
    profilePicture: null,
    phoneNumber: '',
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
  // userprofile.page.ts
  // src/app/userprofile/userprofile.page.ts
  async loadCurrentUser() {
    try {
      const user = await this.authService.getProfile();
      if (user) {
        this.currentUser = {
          name: user.displayName || 'Anonymous',
          email: user.email || 'No email provided',
          userId: user.uid,
          profilePicture:
            this.userService.getProfileImage() || user.photoURL || null, // Prioritize userService image
          phoneNumber: user.phoneNumber || 'No phone number provided',
        };
      } else {
        // Load from UserService when the user is not available from auth service
        this.currentUser = this.userService.getUserData();
        this.currentUser.profilePicture =
          this.userService.getProfileImage() || null; // Retain existing profile image if any
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

  // userprofile.page.ts
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
              // this.userService.clearUserData(); // Uncomment if you want to clear data on logout
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
