import {
  Routes,
} from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MontureDisplayComponent } from './pages/montureDisplay/monture-display.component';

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
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    canActivate: [authGuardFn],
    component: HomeComponent
  },
  {
    path: '',
    canActivate: [authGuardFn],
    component: HomeComponent
  },
  { path: 'monture/:id', 
    canActivate: [authGuardFn],
    component: MontureDisplayComponent 
  } ,

];
