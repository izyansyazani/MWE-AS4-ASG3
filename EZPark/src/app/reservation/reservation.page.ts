import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  LocalNotifications,
  ScheduleOptions,
} from '@capacitor/local-notifications';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonButton,
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
  IonGrid,
  IonButtons,
  IonBackButton,
  IonList,
  IonDatetime,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRow,
    IonButton,
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
    IonGrid,
    IonButtons,
    IonBackButton,
    IonList,
    IonDatetime,
    IonInput,
  ],
})
export class ReservationPage implements OnInit {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}
  goToHome() {
    this.router.navigate(['/home']);
  }

  async showPopup() {
    const alert = await this.alertController.create({
      header: 'Confirm Booking',
      message: 'Are you sure you want to confirm this booking?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Booking cancelled');
          },
        },
        {
          text: 'Confirm',
          handler: async () => {
            console.log('Booking confirmed');
            this.router.navigate(['/home']);
            await this.scheduleNotification();
          },
        },
      ],
    });

    await alert.present();
  }

  async scheduleNotification() {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 111,
          title: 'Booking Confirmed',
          body: 'You have booked a parking.',
        },
      ],
    };

    try {
      await LocalNotifications.schedule(options);
    } catch (ex) {
      alert(JSON.stringify(ex));
    }
  }
}
