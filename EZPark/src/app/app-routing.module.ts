import { RouterModule, Routes } from '@angular/router';

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
  // {
  //   path: 'rate-hours',
  //   loadComponent: () =>
  //     import('./rate-hours/rate-hours.page').then((m) => m.RateHoursPage),
  // },
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
  // {
  //   path: 'edit-profile',
  //   loadComponent: () =>
  //     import('./profile-edit/profile-edit.page').then((m) => m.ProfilePage),
  // },
];
