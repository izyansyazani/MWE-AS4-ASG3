<<<<<<< HEAD
<ion-content>
  <img
    (click)="goToHome()"
    id="back"
    src="../assets/backbutton.png"
    class="back-button"
  />
  <h1>Find Parking:</h1>

  <div class="cards-container">
    <ion-card (click)="goToMall()">
      <img src="../assets/Themall.jpg" />
      <ion-card-content>The Mall, Gadong</ion-card-content>
      <ion-button
        class="favorite-btn"
        (click)="toggleFavorite($event, 'The Mall, Gadong')"
        >{{ isFavorite('The Mall, Gadong') ? 'Unfavorite' : 'Favorite'
        }}</ion-button
      >
    </ion-card>

    <ion-card>
      <img src="../assets/Timessquare.jpg" />
      <ion-card-content>Times Square</ion-card-content>
      <ion-button
        class="favorite-btn"
        (click)="toggleFavorite($event, 'Times Square')"
        >{{ isFavorite('Times Square') ? 'Unfavorite' : 'Favorite'
        }}</ion-button
      >
    </ion-card>

    <ion-card (click)="goToAirportMall()">
      <img src="../assets/Theairportmall.jpg" />
      <ion-card-content>Airport Mall</ion-card-content>
      <ion-button
        class="favorite-btn"
        (click)="toggleFavorite($event, 'Airport Mall')"
        >{{ isFavorite('Airport Mall') ? 'Unfavorite' : 'Favorite'
        }}</ion-button
      >
    </ion-card>

    <ion-card>
      <img src="../assets/Yayasanmall.jpg" />
      <ion-card-content>Yayasan Complex</ion-card-content>
      <ion-button
        class="favorite-btn"
        (click)="toggleFavorite($event, 'Yayasan Complex')"
        >{{ isFavorite('Yayasan Complex') ? 'Unfavorite' : 'Favorite'
        }}</ion-button
      >
    </ion-card>

    <ion-card>
      <img src="../assets/mabohai.jpg" />
      <ion-card-content>Mabohai Shopping Complex</ion-card-content>
      <ion-button
        class="favorite-btn"
        (click)="toggleFavorite($event, 'Mabohai Shopping Complex')"
        >{{ isFavorite('Mabohai Shopping Complex') ? 'Unfavorite' : 'Favorite'
        }}</ion-button
      >
    </ion-card>

    <ion-card (click)="goToAmanHills()">
      <img src="../assets/amanhills.jpg" />
      <ion-card-content>Aman Hills Brunei</ion-card-content>
      <ion-button
        class="favorite-btn"
        (click)="toggleFavorite($event, 'Aman Hills Brunei')"
        >{{ isFavorite('Aman Hills Brunei') ? 'Unfavorite' : 'Favorite'
        }}</ion-button
      >
    </ion-card>
  </div>
</ion-content>
=======
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire';
import { SignupPageRoutingModule } from './pages/signup/signup-routing.module';
import { SignupPage } from './signup/signup.page';
import { routes } from './app.routes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';


@NgModule({
  declarations: [AppComponent, SignupPage, LoginPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    loginPageRoutingModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    SignupPageRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
>>>>>>> 1306f96007e9d9505036b9c6073032736e7b48f6
