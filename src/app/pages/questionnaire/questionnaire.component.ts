// questionnaire.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { Monture } from 'src/models/monture.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule],
})
export class QuestionnaireComponent implements OnInit {
  recommendedMontures: Monture[] = [];
  questions = [
    { question: 'Quel est votre style préféré de monture ?', options: [] },
    { question: 'Quelle couleur préférez-vous ?', options: [] },
    { question: 'Quel type de protection cherchez-vous ?', options: [] },
    { question: 'Quel type de Materiau cherchez-vous ?', options: [] },
    { question: 'Quel type de Marque cherchez-vous ?', options: [] },
    { question: 'Quel type de Monture cherchez-vous ?', options: [] },
    { question: 'Quel type de sécurite cherchez-vous ?', options: [] },
  ];

  answers = {};

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.apiService.getMontures().subscribe((montures) => {
      // Extraction des options uniques pour chaque question
      this.questions[0].options = this.getUniqueOptions(montures, 'Style');
      this.questions[1].options = this.getUniqueOptions(montures, 'Couleur');
      this.questions[2].options = this.getUniqueOptions(montures, 'Categorie_Protection');
      this.questions[3].options = this.getUniqueOptions(montures, 'Materiau');
      this.questions[4].options = this.getUniqueOptions(montures, 'Marque');
      this.questions[5].options = this.getUniqueOptions(montures, 'Type');
      this.questions[6].options = this.getUniqueOptions(montures, 'Securite');
    });

    this.apiService.getVerres().subscribe((verres) => {
      // Assurez-vous que les données des verres sont utilisées correctement
      // Par exemple, si les verres ont des propriétés similaires, vous pouvez les mapper ici
    });
  }

  // Fonction pour obtenir des options uniques basées sur une propriété spécifique
  getUniqueOptions(montures: any[], property: string): string[] {
    return montures
      .map((monture) => monture[property])
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  
  submitAnswers(): void {
    console.log('Réponses soumises:', this.answers);
    this.apiService.getMontures().subscribe((montures) => {
      this.recommendedMontures = montures.filter((monture) => {
        return (
          this.isMatch(monture.Style, this.answers['question0']) &&
          this.isMatch(monture.Couleur, this.answers['question1']) &&
          this.isMatch(monture.Categorie_Protection, this.answers['question2']) &&
          this.isMatch(monture.Materiau, this.answers['question3']) &&
          this.isMatch(monture.Marque, this.answers['question4']) &&
          this.isMatch(monture.Type, this.answers['question5']) &&
          this.isMatch(monture.Securite, this.answers['question6'])
        );
      });
      console.log('Montures recommandées:', this.recommendedMontures);
    });
    // this.router.navigate(['/recommendations']);
  }
  isMatch(property: string, answer: string): boolean {
    return !answer || property.toLowerCase().includes(answer.toLowerCase());
  }
  resetAnswers(): void {
    this.answers = {};
  }
  
}
