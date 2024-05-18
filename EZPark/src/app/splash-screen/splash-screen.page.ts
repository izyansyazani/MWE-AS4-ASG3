import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class SplashScreenPage implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  ngOnDestroy() {
    const element = document.getElementById('splash-screen');
    if (element) {
      element.parentNode!.removeChild(element);
    }
  }

  hide() {
    const element = document.getElementById('splash-screen');
    if (element) {
      element.classList.add('hidden');
    }
  }
}
