import {
  Routes,
} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { ErrorComponent } from './pages/error/error.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuardFn],
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [authGuardFn],
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [authGuardFn],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuardFn],
  },
  {
    path: '',
    component: LoginComponent,
  },

];
