import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isExpanded = false;

  constructor(private router:Router,public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
  checkLogin(){
      this.auth.isAuthenticated$.subscribe(isAuthenticated => {
       if (isAuthenticated) {
         console.log("AUTH")
         this.router.navigate(['/home']);
       }
     });
  }
  login() {
    this.auth.loginWithRedirect();
    if(this.auth){
      this.router.navigate(['/home']);
    }
  }
  link_home(){
    this.router.navigate(['/home'])
  }
  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

  ngOnInit() {
    // Vérifiez si l'utilisateur est déjà authentifié et redirigez-le
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Si l'utilisateur est authentifié, redirigez-le vers la page d'accueil
        this.router.navigate(['/home']); // Remplacez "/home" par le chemin de votre page d'accueil
      }
    });
  }
}