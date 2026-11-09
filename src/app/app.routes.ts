import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', title: 'Capitec | Welcome', loadComponent: () => import('./pages/welcome.component').then(m => m.WelcomeComponent) },
  { path: 'auth', title: 'Capitec | Sign in or register', loadComponent: () => import('./pages/auth.component').then(m => m.AuthComponent) },
  { path: 'forgot-password', title: 'Capitec | Forgot password', loadComponent: () => import('./pages/forgot.component').then(m => m.ForgotComponent) },
  { path: '**', redirectTo: '' }
];
