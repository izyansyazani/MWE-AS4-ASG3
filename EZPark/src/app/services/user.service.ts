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
    // Return profile picture or a default image if not set
    return data.profilePicture || 'assets/default-profile-picture.png'; // Ensure correct path
  }

  setProfileImage(image: string | ArrayBuffer | null) {
    const userData = this.getUserData();
    // Convert image to string if it's an ArrayBuffer
    userData.profilePicture = image
      ? typeof image === 'string'
        ? image
        : image.toString()
      : null;
    this.setUserData(userData);
  }
}
