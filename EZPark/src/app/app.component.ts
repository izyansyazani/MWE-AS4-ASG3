import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ParkingAlertService } from './services/parking-alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private parkingAlertService: ParkingAlertService) {
    this.initializeApp();
  }

  initializeApp() {}

  ngOnInit() {}
}
