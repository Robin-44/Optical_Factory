import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  standalone: true,
  imports: [CommonModule, NavBarComponent, RouterModule]
})
export class BasketComponent implements OnInit {
  basket: any[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.apiService.getBasketUser().subscribe(
      (response) => {
        this.basket = response.panier;
        this.loading = false;
        console.log('BASKET : ', this.basket);
      },
      (error) => {
        console.error('Erreur lors du chargement du panier:', error);
        this.loading = false;
      }
    );
  }

  removeItem(montureId: string): void {
    this.apiService.reduceMontureQuantity(montureId).subscribe(() => {
      this.loadBasket();
    });
  }

  checkout(): void {
    this.apiService.checkout().subscribe(() => {
      alert('Achat effectué avec succès !');
      this.loadBasket();
    });
  }
}
