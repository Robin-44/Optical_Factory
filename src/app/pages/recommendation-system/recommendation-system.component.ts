import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper'; // 👈 Ajout du module stepper
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-recommendation-system',
  standalone: true,
  imports: [
    MatStepperModule,
    MatButtonModule,
    NavBarComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './recommendation-system.component.html',
  styleUrls: ['./recommendation-system.component.css']
})
export class RecommendationSystemComponent implements OnInit {
  formulaire!: FormGroup;
  monturesColumns: any[] = [];  // Colonnes de l'API
  steps: string[][] = [];
  formStep: any[] = [];
  recommendedMontures: any[] = [];
  recommendedVerres: any[] = [];
  loading = true;
  predict_basket = false;
  predict_api = true;
  predict_loading = false; // Variable pour gérer l'affichage du loader

  montures_recommandees = []
  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder, private http: HttpClient,) {
    
     // Génération dynamique du formulaire
     this.formulaire = this.fb.group({});
    
  
  }
  toggle_predict(text:String){
    if(text == 'api'){
      this.predict_api = false
      this.predict_basket = true
    } else {
      this.predict_api = true
      this.predict_basket = false
    }
  }

soumettre() {
  console.log('Données soumises :', this.formulaire.value);
  if (this.formulaire.valid) {
    this.predict_loading = true; // Activer le loader

    this.apiService.recommander(this.formulaire.value)
      .subscribe(
        res => {
          if(res.montures_recommandees.length > 0){
            this.montures_recommandees = res.montures_recommandees;
            console.log(res.montures_recommandees)
            this.predict_loading = false;
          }
       
        },
        error => {
          console.error("Erreur lors de la requête API", error);
          this.predict_loading = false; // Désactiver le loader en cas d'erreur
        }
      );

  
  } else {
    console.log('Formulaire invalide');
  }
}


  ngOnInit() {
    // Définir tous les champs
    const allFields = ['nom', 'prenom', 'email', 'telephone', 'adresse', 'code_postal'];
    // Initialiser le formulaire avec les champs vides
    this.formulaire = this.fb.group({});
    allFields.forEach(field => {
      this.formulaire.addControl(field, this.fb.control('', Validators.required));
    });


    this.loadRecommendations();
    // Séparer les champs en groupes de 2 par étape
    for (let i = 0; i < allFields.length; i += 2) {
      this.steps.push(allFields.slice(i, i + 2));
    }
    this.apiService.getMontures().subscribe(
      data => {
        // Supposez que data contient les données de montures
        this.monturesColumns = this.extractColumnsFromData(data);
        Object.keys(data).forEach(key => {
          this.formulaire.addControl(key, this.fb.control(data[key]));
        });
        this.formulaire = this.fb.group({});
        this.createFormControls();
        // Organiser les champs en étapes (2 par étape)
        this.steps = this.chunkColumns(Object.keys(this.formulaire.controls), 2);
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }
  genre: string[] = ['Homme','Femme','non-bianire'];
  marque: string[] = [];
  type: string[] = [];
  forme: string[] = [];
  materiau: string[] = [];
  couleur: string[] = [];
  modele: string[] = [];
  style: string[] = [];
  age: number[] = [10,20,30,40];
  tailleLens: number[] = [10,20,30,40];
  tailleBridge: number[] = [10,20,30,40];
  tailleTemple: number[] = [10,20,30,40];
  // Extraire les colonnes à partir des données récupérées
  extractColumnsFromData(data: any[]): string[] {
    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      if (obj.Marque) this.marque.push(obj.Marque);
      if (obj.Type) this.type.push(obj.Type);
      if (obj.Forme) this.forme.push(obj.Forme);
      if (obj.Materiau) this.materiau.push(obj.Materiau);
      if (obj.Couleur) this.couleur.push(obj.Couleur);
      if (obj.Style) this.style.push(obj.Style);
      if (obj.Modele) this.modele.push(obj.Modele);
    }
    const columns = [
      'Genre','Marque', 'Type', 'Forme','Materiau', 'Couleur','Style','Age', 'Modele','Taille_Lens', 'Taille_Bridge','Taille_Temple'
    ];
    return columns;
  }

  // Créer les contrôles du formulaire à partir des colonnes
  createFormControls() {
    this.monturesColumns.forEach(column => {
        // Champs de type texte par défaut
        this.formulaire.addControl(column, this.fb.control('', Validators.required));
    });
  }
  

  // Séparer les champs en étapes de 2 colonnes
  chunkColumns(columns: string[], chunkSize: number): string[][] {
    const chunks = [];
    for (let i = 0; i < columns.length; i += chunkSize) {
      chunks.push(columns.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // Vérifier si un champ est une sélection (dropdown)
  isSelection(champ: string): boolean {
    const selectionColumns = ['Genre','Marque', 'Modele', 'Type', 'Forme', 'Materiau', 'Couleur', 'Style', 'Taille_Lens', 'Taille_Bridge','Taille_Temple', 'Age'];
    return selectionColumns.includes(champ);
  }

  getColumnOptions(champ: string): string[] {
    const options: { [key: string]: string[] } = {
      'Genre': this.genre,
      'Marque': this.marque,
      'Modele': this.modele,
      'Type': this.type,
      'Forme': this.forme,
      'Materiau': this.materiau,
      'Couleur': this.couleur,
      'Style': this.style,
      'Age': Array.from({ length: 10 }, (_, i) => (i * 10).toString()) ,
      'Taille_Lens': Array.from({ length: 10 }, (_, i) => (i * 10).toString()) ,
      'Taille_Bridge': Array.from({ length: 10 }, (_, i) => (i * 10).toString()),
      'Taille_Temple': Array.from({ length: 10 }, (_, i) => (i * 10).toString()) 
    };
  
    return options[champ] || [];
  }
   
  home(){
    this.router.navigate(['/home'])
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
