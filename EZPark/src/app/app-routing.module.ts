import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileEditPage } from './profile-edit/profile-edit.page';

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
  {
    path: 'edit-profile',
    loadComponent: () =>
      import('./profile-edit/profile-edit.page').then((m) => m.ProfileEditPage),
  },

{
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
},
{
  path: 'forgot-password',
  loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
},
{
  path: 'signup',
  loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
},
{
  path: 'verify',
  loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
},
{
  path: 'landing',
  loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
},
{
  path: 'confirmation',
  loadChildren: () => import('./pages/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
},
{
  path: 'journals',
  loadChildren: () => import('./pages/journals/journals.module').then( m => m.JournalsPageModule)
},
{
  path: 'journal',
  loadChildren: () => import('./pages/journal/journal.module').then( m => m.JournalPageModule)
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
