import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-amanhillsrating',
  templateUrl: './amanhillsrating.page.html',
  styleUrls: ['./amanhillsrating.page.scss'],
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
export class AmanhillsratingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
}
