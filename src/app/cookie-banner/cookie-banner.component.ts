import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css'],
  standalone:true,
  imports: [CommonModule,FormsModule]
})
export class CookieBannerComponent implements OnInit {
  showBanner: boolean = true;
constructor(private router:Router){

}
  ngOnInit(): void {
    // Vérifier si l'utilisateur a déjà accepté les cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      this.showBanner = false;
    }
  }

  accept_politique() {
    this.router.navigate(["/cgu"])
  }

  acceptCookies(): void {
    localStorage.setItem('cookiesAccepted', 'true'); // Sauvegarde la préférence
    this.showBanner = false; // Cache la bannière
  }
}
