import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './auth-service.service'; // Adjust the path as needed

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

   ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user) {
        console.log('User is logged in:', user);
      } else {
        console.log('No user is logged in');
      }
    });
  }
}