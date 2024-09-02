import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButtons,
  IonCol,
  IonSearchbar,
  IonCard,
  IonIcon,
  IonItem,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonImg,
  IonLabel,
  IonList,
  IonMenuButton,
  IonButton,
  IonMenu,
  IonApp,
  IonText,
  IonGrid,
  IonThumbnail,
  IonAvatar,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-edit',
  templateUrl: 'profile-edit.page.html',
  styleUrls: ['profile-edit.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRow,
    IonButtons,
    IonCol,
    IonSearchbar,
    IonCard,
    IonIcon,
    IonItem,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonImg,
    IonLabel,
    IonList,
    IonMenuButton,
    IonButton,
    IonMenu,
    IonApp,
    IonThumbnail,
    RouterModule,
    IonAvatar,
    IonInput,
  ],
})
export class ProfilePage {
  profileImage: string = 'assets/img/default-profile.png'; // Default image
  user: any = {
    name: '',
    email: '',
    phone: '',
  };

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProfile() {
    // Here you would usually save the data to a backend
    const alert = await this.alertCtrl.create({
      header: 'Profile Saved',
      message: 'Your profile information has been saved.',
      buttons: ['OK'],
    });

    await alert.present();
    this.navCtrl.navigateBack('/home'); // Redirect to a different page or home
  }
}
