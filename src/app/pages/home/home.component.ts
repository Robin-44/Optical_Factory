import { Component, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HomeContentComponent } from './../../components/home-content/home-content.component';
import { HeroComponent } from './../../components/hero/hero.component';
import { LoadingComponent } from './../../components/loading/loading.component';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { ApiService } from 'src/app/api.service';
import { Monture } from '../../../models/monture.model'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    HomeContentComponent,
    HeroComponent,
    NavBarComponent,
    LoadingComponent,
    AsyncPipe,
    NgIf,
    CommonModule
  ]
})

export class HomeComponent {
  montures: Monture[] = [];
  @Input() tendances = [
    {
      nom: "Lunettes de Soleil Ray-Ban",
      image: "assets/glasses/sunset-1283872_1280.jpg",
      description: "Style et protection UV au rendez-vous.",
      prix: "149.99€"
    },
    {
      nom: "Lentilles de Contact HydraSoft",
      image: "assets/glasses/pexels-thebstudio-947885.jpg",
      description: "Une vision nette avec un confort exceptionnel.",
      prix: "29.99€"
    },
    {
      nom: "Lunettes de Soleil Gucci",
      image: "assets/glasses/kiran-ck-lSl94SZHRgA-unsplash.jpg",
      description: "L'élégance au service de votre regard.",
      prix: "199.99€"
    }
  ];
  

  @Input() innovations = [
    {
      nom: "IA - Essayage virtuel",
      image: "assets/glasses/fetchIA-glasses.png",
      description: "Style et protection UV au rendez-vous.",
      prix: "149.99€"
    }
  ];
  @Input() selection_opticians = [
    {
      nom: "Lunettes de Soleil Prada",
      image: "assets/glasses/pexels-stephendn-131018.jpg",
      description: "Un style unique et une protection assurée.",
      prix: "159.99€"
    },
    {
      nom: "Lunettes de Vue Chanel",
      image: "assets/glasses/redowan-dhrubo-OWfBsDDOUlQ-unsplash.jpg",
      description: "Élégance et confort réunis dans un design moderne.",
      prix: "249.99€"
    },
    {
      nom: "Lentilles de Contact Air Optix",
      image: "assets/glasses/na-sen-e9uWKA9-CFE-unsplash.jpg",
      description: "Des lentilles ultra-fines pour un port agréable.",
      prix: "39.99€"
    },
    {
      nom: "Lunettes de Soleil Versace",
      image: "assets/glasses/bartosz-sujkowski-uxzWfwOIyT8-unsplash.jpg",
      description: "Un design luxueux pour une touche de glamour.",
      prix: "229.99€"
    }
  ];
  
  @Input() best_sales = [
    {
      nom: "Lunettes de Soleil Dior",
      image: "assets/glasses/anton-be-ODhxNCO8XHY-unsplash.jpg",
      description: "Un look raffiné pour les journées ensoleillées.",
      prix: "179.99€"
    },
    {
      nom: "Lunettes de Vue Hugo Boss",
      image: "assets/glasses/eyekeeper-eyekeeper-VtFvDYh7Qvc-unsplash.jpg",
      description: "Une monture élégante pour une vision parfaite.",
      prix: "199.99€"
    },
    {
      nom: "Lentilles de Contact Bausch & Lomb",
      image: "assets/glasses/ivan-cruz-crBbisAE40U-unsplash.jpg",
      description: "Un confort durable tout au long de la journée.",
      prix: "34.99€"
    },
    {
      nom: "Lunettes de Soleil Police",
      image: "assets/glasses/eyekeeper-eyekeeper-cyQtEO1nvxw-unsplash.jpg",
      description: "Un style audacieux pour affirmer votre personnalité.",
      prix: "149.99€"
    }
  ];

  
  
  constructor(public router: Router,public auth: AuthService,public apiService:ApiService) {}


  ngOnInit() {
    // Vérifiez si l'utilisateur est déjà authentifié et redirigez-le
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      console.log(isAuthenticated)
      if (isAuthenticated) {
        // Si l'utilisateur est authentifié, redirigez-le vers la page d'accueil
        this.router.navigate(['/home']); // Remplacez "/home" par le chemin de votre page d'accueil
      } else {
        this.router.navigate(['/login']); 
      }
    });


    this.apiService.getClients$().subscribe(
      (data) => {
        this.montures = data;
      },
      (error) => {
        console.error('There was an error fetching clients!', error);
      }
    );
  }


}
