import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

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
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ezpark-9ac40',
        appId: '1:546396358335:web:6d2cec62e7f19abff8e80a',
        databaseURL:
          'https://ezpark-9ac40-default-rtdb.asia-southeast1.firebasedatabase.app',
        storageBucket: 'ezpark-9ac40.appspot.com',
        apiKey: 'AIzaSyBeefgv-ytofUfqz_iDMrczDqpMLOVhHVE',
        authDomain: 'ezpark-9ac40.firebaseapp.com',
        messagingSenderId: '546396358335',
        measurementId: 'G-LNMLYQJCNK',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
  ],
});
