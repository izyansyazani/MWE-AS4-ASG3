import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-timessquarerating',
  templateUrl: './timessquarerating.page.html',
  styleUrls: ['./timessquarerating.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TimessquareratingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
