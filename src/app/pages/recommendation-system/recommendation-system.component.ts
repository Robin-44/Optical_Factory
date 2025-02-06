import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recommendation-system',
  standalone: true,
  imports: [CommonModule,NavBarComponent,FormsModule],
  templateUrl: './recommendation-system.component.html',
  styleUrls: ['./recommendation-system.component.css']
})
export class RecommendationSystemComponent implements OnInit {
  recommendedMontures: any[] = [];
  recommendedVerres: any[] = [];
  loading = true;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }
  navigate_to_questionnaire(){
    this.router.navigate(['/questionnaire'])
  }
  loadRecommendations(): void {
    console.log("LOAD RECOMMENDATION")
    this.apiService.getRecommendationsFromBasket().subscribe(
      (response) => {
        this.recommendedMontures = response.recommendedMontures;
        this.recommendedVerres = response.recommendedVerres;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des recommandations:', error);
        this.loading = false;
      }
    );
  }
}
