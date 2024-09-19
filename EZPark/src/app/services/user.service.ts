// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData = {
    name: '',
    email: '',
    phone: '',
  };

  private profileImage: string | ArrayBuffer | null = null;

  setUserData(data: { name: string; email: string; phone: string }) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

  setProfileImage(image: string | ArrayBuffer | null) {
    this.profileImage = image;
  }

  getProfileImage() {
    return this.profileImage;
  }
}
