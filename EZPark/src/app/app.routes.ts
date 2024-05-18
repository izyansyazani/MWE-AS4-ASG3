import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'about-us',
    loadComponent: () => import('./about-us/about-us.page').then( m => m.AboutUsPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'parking-spot',
    loadComponent: () => import('./parking-spot/parking-spot.page').then( m => m.ParkingSpotPage)
  },
  {
    path: 'receipts',
    loadComponent: () => import('./receipts/receipts.page').then( m => m.ReceiptsPage)
  },
  {
    path: 'reservation',
    loadComponent: () => import('./reservation/reservation.page').then( m => m.ReservationPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'signup-login',
    loadComponent: () => import('./signup-login/signup-login.page').then( m => m.SignupLoginPage)
  },
  {
    path: 'splash-screen',
    loadComponent: () => import('./splash-screen/splash-screen.page').then( m => m.SplashScreenPage)
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./user-profile/user-profile.page').then( m => m.UserProfilePage)
  },
];
