import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
})
export class ProfileEditPage {
  profileImage: string | ArrayBuffer | null = null;
  user = {
    name: '',
    email: '',
    phone: '',
  };

  constructor() {}

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
    // Implement save profile logic here
    console.log('Profile saved', this.user);
  }
}
