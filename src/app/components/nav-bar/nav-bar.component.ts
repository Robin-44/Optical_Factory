import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isExpanded = false;

  constructor(private router:Router,public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
  checkLogin(){
      this.auth.isAuthenticated$.subscribe(isAuthenticated => {
       if (isAuthenticated) {
         this.router.navigate(['/home']);
       }
     });
  }
  login() {
    this.auth.loginWithRedirect();
  }
  link_home(){
    this.router.navigate(['/home'])
  }
  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

  ngOnInit() {

  }
}