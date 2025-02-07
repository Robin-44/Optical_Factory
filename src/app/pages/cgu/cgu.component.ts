import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule,NavBarComponent]
})
export class CguComponent {
  constructor(private router:Router){
    
  }
  cguSections = [
    { title: "Article 1 - Objet", content: "Les présentes Conditions Générales d'Utilisation (CGU) définissent les modalités et conditions d'utilisation du site e-commerce par les utilisateurs." },
    { title: "Article 2 - Acceptation des CGU", content: "L'utilisation du site implique l'acceptation pleine et entière des présentes CGU." },
    { title: "Article 3 - Accès au site", content: "Le site est accessible à tout utilisateur disposant d'une connexion internet." },
    { title: "Article 4 - Produits et Services", content: "Le site propose à la vente divers produits et services dont les caractéristiques et les prix sont précisés sur les fiches descriptives." },
    { title: "Article 5 - Commandes", content: "Toute commande implique l'acceptation des Conditions Générales de Vente (CGV)." },
    { title: "Article 6 - Responsabilité", content: "Le site s'efforce d'assurer la fiabilité des informations publiées." },
    { title: "Article 7 - Protection des données personnelles", content: "Les informations recueillies sont traitées conformément à notre politique de confidentialité." },
    { title: "Article 8 - Propriété intellectuelle", content: "Tous les contenus du site sont protégés par les lois en vigueur sur la propriété intellectuelle." },
    { title: "Article 9 - Modification des CGU", content: "Le site se réserve le droit de modifier les CGU à tout moment." },
    { title: "Article 10 - Droit applicable et juridiction compétente", content: "Les présentes CGU sont soumises au droit français." },
    { title: "Article 11 - Contact", content: "Pour toute question relative aux CGU, contactez-nous à [email]." }
  ];

  navigate_to_home(){
    this.router.navigate(["/home"])
  }
}
