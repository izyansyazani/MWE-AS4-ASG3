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
  selector: 'app-yayasanrating',
  templateUrl: './yayasanrating.page.html',
  styleUrls: ['./yayasanrating.page.scss'],
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
export class YayasanratingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
}
