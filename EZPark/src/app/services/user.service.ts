import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataKey = 'userData'; // Key for user data in local storage
  private profileImageKey = 'profileImage'; // Key for profile image in local storage

  getUserData() {
    const userData = localStorage.getItem(this.userDataKey);
    return userData ? JSON.parse(userData) : { name: '', email: '', phone: '' }; // Default value
  }

  setUserData(data: any) {
    localStorage.setItem(this.userDataKey, JSON.stringify(data));
  }

  getProfileImage() {
    return localStorage.getItem(this.profileImageKey); // Return the profile image URL from local storage
  }

  setProfileImage(image: string | ArrayBuffer | null) {
    localStorage.setItem(this.profileImageKey, image as string); // Store the image in local storage
  }

  clearUserData() {
    localStorage.removeItem(this.userDataKey);
    localStorage.removeItem(this.profileImageKey);
  }
}
