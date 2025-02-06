import {
  Routes,
} from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { MontureDisplayComponent } from './pages/montureDisplay/monture-display.component';

// Sans Login
import { HelpComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MentionsLegales } from './pages/mentions-legales/mentions-legales.component';
import { CGV } from './pages/cgv/cgv.component';
import { CGU } from './pages/cgu/cgu.component';
import { PolitiqueDeConfidentialite } from './pages/politique-de-confidentialite/politique-de-confidentialite.component';
import { Cookies } from './pages/cookies/cookies.component';
import { RetourRemboursement } from './pages/retour-remboursement/retour-remboursement.component';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { from } from 'rxjs';
import { BasketComponent } from './pages/basket/basket.component';
import { RecommendationSystemComponent } from './pages/recommendation-system/recommendation-system.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';

export const routes: Routes = [
  // Sans Login
  {
    path: 'mentions-legales',
    component: MentionsLegales
  },
  {
    path: 'cgv',
    component: CGV
  },
  {
    path: 'cgu',
    component: CGU
  },
  {
    path: 'politique-de-confidentialite',
    component: PolitiqueDeConfidentialite
  },
  {
    path: 'cookies',
    component: Cookies
  },
  {
    path: 'retour-remboursement',
    component: RetourRemboursement
  },
  {
    path: 'faq',
    component: HelpComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
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
    component: LoginComponent
  },
  { path: 'monture/:id', 
    canActivate: [authGuardFn],
    component: MontureDisplayComponent 
  } ,
  { path: 'questionnaire', canActivate: [authGuardFn], component: QuestionnaireComponent },
  { path: 'recommendation_system', 
    canActivate: [authGuardFn],
    component: RecommendationSystemComponent 
  } ,
  { path: 'basket', 
    canActivate: [authGuardFn],
    component: BasketComponent 
  } ,

];
