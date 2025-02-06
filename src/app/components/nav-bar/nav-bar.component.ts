import { Component, Inject, Input } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  quantity: number = 0;
  isExpanded = false;

  constructor(
    private router: Router,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private apiService: ApiService
  ) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  checkLogin() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  link_home() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

  ngOnInit(): void {

    this.loadQuantityFromAPI();
  }
  
  loadQuantityFromAPI(): void {
    this.apiService.getCountMontureToBasket().subscribe((response) => {
      this.quantity = response.quantity;
    });
  }
}
