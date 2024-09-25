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

  getUserData() {
    return this.userData;
  }

  setUserData(data: any) {
    this.userData = data;
  }

  getProfileImage() {
    return this.profileImage;
  }

  setProfileImage(image: string | ArrayBuffer | null) {
    this.profileImage = image;
  }
}
