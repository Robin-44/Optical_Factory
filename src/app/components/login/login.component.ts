import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isExpanded = false;

  constructor(private router:Router,public auth: AuthService,private apiService:ApiService,
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
    // Vérifiez si l'utilisateur est authentifié
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Récupérer les informations de l'utilisateur depuis l'Observable user$
        this.auth.user$.subscribe(user => {
          if (user) {
            const userData = {
              username: user.name,   // Auth0 stocke souvent le nom dans `name`
              email: user.email,     // L'email est généralement accessible directement
              sub: user.sub          // L'identifiant unique de l'utilisateur (peut être utile)
            };
            console.log("USER : ",userData)

        
            // Envoyer les données de l'utilisateur à l'API
            this.apiService.register(userData).subscribe(
              response => {
                console.log('User registered successfully:', response);
                this.router.navigate(['/home']);
              },
              error => {
                console.error('Error registering user:', error);
              }
            );
          }
        });
      } else {
        // Si l'utilisateur n'est pas authentifié, le rediriger vers la page de connexion
        this.router.navigate(['/login']);
      }
    });
  
    console.log(this.auth);  // Pour voir les données de l'objet auth dans la console
  }
  
  
  }
  