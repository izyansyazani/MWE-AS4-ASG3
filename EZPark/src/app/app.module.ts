import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
// import { provideStorage, getStorage } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireModule } from '@angular/fire';
// import { SignupPage } from './signup/signup.page';
// import { routes } from './app.routes';
// import { RouterModule } from '@angular/router';
// import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // AngularFireAuthModule,
    // LoginPageRoutingModule,
    // RouterModule.forChild(routes),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,

    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Provide Firebase Auth and Firestore services
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    // SignupPageRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Added CUSTOM_ELEMENTS_SCHEMA here
})
export class AppModule {}
