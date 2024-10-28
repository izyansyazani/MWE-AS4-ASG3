import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataKey = 'userData';

  getUserData() {
    const data = localStorage.getItem(this.userDataKey);
    return data
      ? JSON.parse(data)
      : { name: '', email: '', phone: '', profilePicture: null };
  }

  setUserData(data: any) {
    localStorage.setItem(this.userDataKey, JSON.stringify(data));
  }

  getProfileImage() {
    const data = this.getUserData();
    return data.profilePicture || 'default-profile-picture.png'; // Fallback image
  }

  setProfileImage(image: string | ArrayBuffer | null) {
    const userData = this.getUserData();
    userData.profilePicture = image;
    this.setUserData(userData);
  }
}
