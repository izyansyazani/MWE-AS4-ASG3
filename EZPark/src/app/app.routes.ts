import { Routes } from '@angular/router';
import { ReceiptsPage } from './receipts/receipts.page';
import { HistoryPage } from './history/history.page';

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
    path: 'signup-login',
    loadComponent: () =>
      import('./signup-login/signup-login.page').then((m) => m.SignupLoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'parkingspots',
    loadComponent: () =>
      import('./parkingspots/parkingspots.page').then(
        (m) => m.ParkingspotsPage
      ),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'userprofile',
    loadComponent: () =>
      import('./userprofile/userprofile.page').then((m) => m.UserprofilePage),
  },
  {
    path: 'aboutus',
    loadComponent: () =>
      import('./aboutus/aboutus.page').then((m) => m.AboutusPage),
  },
  {
    path: 'receipts',
    loadComponent: () =>
      import('./receipts/receipts.page').then((m) => m.ReceiptsPage),
  },
  {
    path: 'mall',
    loadComponent: () =>
      import('./parkingspots/mall/mall.page').then((m) => m.MallPage),
  },
  {
    path: 'splash-screen',
    loadComponent: () =>
      import('./splash-screen/splash-screen.page').then(
        (m) => m.SplashScreenPage
      ),
  },
  {
    path: 'airportmall',
    loadComponent: () =>
      import('./parkingspots/airportmall/airportmall.page').then(
        (m) => m.AirportmallPage
      ),
  },
  {
    path: 'amanhill',
    loadComponent: () =>
      import('./parkingspots/amanhill/amanhill.page').then(
        (m) => m.AmanhillPage
      ),
  },
  { path: 'receipts', component: ReceiptsPage },
  { path: 'history', component: HistoryPage },
  {
    path: 'mall2',
    loadComponent: () =>
      import('./parkingspots/mall2/mall2.page').then((m) => m.Mall2Page),
  },
  {
    path: 'reservation',
    loadComponent: () =>
      import('./reservation/reservation.page').then((m) => m.ReservationPage),
  },
  {
    path: 'feedback',
    loadComponent: () =>
      import('./feedback/feedback.page').then((m) => m.FeedbackPage),
  },  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then( m => m.PaymentPage)
  },

];
