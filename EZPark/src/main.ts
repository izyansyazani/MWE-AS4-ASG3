import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      "projectId": "ezpark-7ec4d",
      "appId": "1:495351849846:web:1fe95033e09a44a63ed057",
      "databaseURL": "https://ezpark-7ec4d-default-rtdb.asia-southeast1.firebasedatabase.app",
      "storageBucket": "ezpark-7ec4d.appspot.com",
      "apiKey": "AIzaSyBPkqCi7EM1WWmJ755fmCcjvH15-RYCuAc",
      "authDomain": "ezpark-7ec4d.firebaseapp.com",
      "messagingSenderId": "495351849846",
      "measurementId": "G-VLQB2P7SE8"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    
  ],
});
