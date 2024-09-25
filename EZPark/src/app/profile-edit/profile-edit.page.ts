import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ProfileEditPage implements OnInit {
  profileImage: string | ArrayBuffer | null = null;
  user = {
    name: '',
    email: '',
    phone: '',
  };

  constructor(private router: Router, private userService: UserService) {
    // Check if state was passed and set user data
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
    }
  }

  ngOnInit() {
    // Load user data from the service if not passed
    if (!this.user.name) {
      this.user = this.userService.getUserData();
    }
    this.profileImage = this.userService.getProfileImage();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    this.userService.setUserData(this.user);
    this.userService.setProfileImage(this.profileImage);
    console.log('Profile saved', this.user);
    this.router.navigate(['/userprofile']); // Navigate back to user profile
  }
}
