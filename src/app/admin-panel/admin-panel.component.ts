import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule,NavBarComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  tables: string[] = [];
  selectedTable: string = '';
  tableData: any[] = [];
  newRow: any = {};
  showForm = false;
  public count_montures:any = 0; 
  public count_baskets:any = 0; 
  public count_clients:any = 0; 
  public count_prescriptions:any = 0; 
  public count_glasses:any = 0; 
  public count_orders:any = 0; 
  public chart:any;

  public clientChart:any;
  public orderStatusChart:any;
  public montureChart:any;
  public verreChart:any;
  public commandChart:any;
  userTotals: any[] = [];
  userChart: any;
  prescriptions = { total: 0, traitees: 0 };

  progressData = {
    ventesPersol: 0,
    ventesRayBan: 0,
    ventesOakley: 0,
    prescriptions: 0
  };
  // Données des lunettes les plus vendues
  public topLunettes:any;

  constructor(private apiService: ApiService, private router:Router) {}

  fetchData(): void {
    this.apiService.getPrescriptions$().subscribe(data => {
      const aujourdHui = new Date();
      console.log("PRESCIPRTIONS := ",data)
      this.prescriptions = {
        total: data.length,
        traitees: data.filter(p => {
          const datePrescription = new Date(p.createdAt);
          const diffJours = (aujourdHui.getTime() - datePrescription.getTime()) / (1000 * 3600 * 24);
          return diffJours > 7; // Considérer "traitée" si plus de 7 jours
        }).length
      };

      console.log(this.prescriptions)
  
      this.calculerProgression();
    });
  }

  calculerProgression(): void {
    if (this.topLunettes.length > 0) {
      const totalVentes = this.topLunettes.reduce((sum, m) => sum + m.Ventes, 0) || 1; // Évite division par 0

      const persol = this.topLunettes.find(m => m.Marque === 'Persol')?.Ventes || 0;
      const rayban = this.topLunettes.find(m => m.Marque === 'Ray-Ban')?.Ventes || 0;
      const oakley = this.topLunettes.find(m => m.Marque === 'Oakley')?.Ventes || 0;

      this.progressData.ventesPersol = (persol / totalVentes) * 100;
      this.progressData.ventesRayBan = (rayban / totalVentes) * 100;
      this.progressData.ventesOakley = (oakley / totalVentes) * 100;
    }

    if (this.prescriptions.total > 0) {
      this.progressData.prescriptions = (this.prescriptions.traitees / this.prescriptions.total) * 100;
    }
  }
  loadUserTotals(): void {
    this.apiService.getUserTotals().subscribe(
      (response) => {
        // Afficher la réponse dans la console (pour le débogage)
        console.log(response);
        this.userTotals = response;
        
        // Extraire les noms des clients et leurs montants totaux
        const clientNames = this.userTotals.map((user: any) => user.clientName);
        const totalAmounts = this.userTotals.map((user: any) => user.total);

        // Créer un graphique à barres avec Chart.js
        this.userChart = new Chart('userChart', {
          type: 'bar', // Type de graphique (barres)
          data: {
            labels: clientNames, // Noms des clients
            datasets: [{
              label: 'Montant Total des Commandes', // Légende du graphique
              data: totalAmounts, // Montants totaux des commandes
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur des barres
              borderColor: 'rgba(75, 192, 192, 1)', // Bord des barres
              borderWidth: 1 // Largeur des bordures
            }]
          },
          options: {
            responsive: true, // Adapter la taille du graphique à l'écran
            scales: {
              y: {
                beginAtZero: true // Commencer l'axe Y à zéro
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des montants des commandes par utilisateur:', error);
      }
    );
  }

  loadMontantsByMonth(): void {
    this.apiService.getMontantsByMonth().subscribe(
      (response) => {
        // Réponse de l'API : récupérer les mois et les montants
        console.log(response);

        const months = response.map((item: any) => `${item.month}/${item.year}`);
        const totals = response.map((item: any) => item.total);

        // Créer le graphique avec Chart.js
        this.commandChart = new Chart('commandChart', {
          type: 'bar', // Type de graphique (barres)
          data: {
            labels: months, // Mois et année
            datasets: [{
              label: 'Montant Total des Commandes par Mois', // Légende du graphique
              data: totals, // Montant total des commandes pour chaque mois
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur des barres
              borderColor: 'rgba(75, 192, 192, 1)', // Bord des barres
              borderWidth: 1 // Largeur des bordures
            }]
          },
          options: {
            responsive: true, // Adapter la taille du graphique à l'écran
            scales: {
              y: {
                beginAtZero: true // Commencer l'axe Y à zéro
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des montants par mois:', error);
      }
    );
  }

  loadVerreData() {
    // Appel à l'API pour récupérer les verres groupés par type
    this.apiService.getMonturesByType().subscribe(
      (response) => {
        const types = response.map((item: any) => item.type);
        const verreCounts = response.map((item: any) => item.count);
        this.verreChart = new Chart('verreChart', {
          type: 'bar', // Type de graphique : barres
          data: {
            labels: types, // Types de verres comme labels
            datasets: [{
              label: 'Verres par Type', // Légende du graphique
              data: verreCounts, // Nombre de verres pour chaque type
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur des barres
              borderColor: 'rgba(75, 192, 192, 1)', // Bordure des barres
              borderWidth: 1 // Largeur de la bordure des barres
            }]
          },
          options: {
            responsive: true, // Adapter la taille du graphique
            scales: {
              y: {
                beginAtZero: true // L'axe Y commence à 0
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des verres par type:', error); // Gérer les erreurs
      }
    );
  }
  
  loadOrdersByStatus() {
    // Appel à l'API pour récupérer les commandes groupées par statut
    this.apiService.getOrdersByStatus().subscribe(
      (response) => {
        // Réponse de l'API : récupérer les statuts et le nombre de commandes par statut
        console.log("API REPSONSE STATUS : ",response);
  
        // Extraire les statuts (par exemple : 'En cours', 'Livrée', etc.)
        const statuses = response.map((item: any) => item.statut);
  
        // Extraire le nombre de commandes pour chaque statut
        const orderCounts = response.map((item: any) => item.count);
  
        // Création du graphique avec Chart.js
        this.orderStatusChart = new Chart('orderStatusChart', {
          type: 'bar', // Type de graphique (barres)
          data: {
            labels: statuses, // Statuts des commandes
            datasets: [{
              label: 'Nombre de Commandes par Statut', // Légende du graphique
              data: orderCounts, // Nombre de commandes pour chaque statut
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur des barres
              borderColor: 'rgba(75, 192, 192, 1)', // Bord des barres
              borderWidth: 1 // Largeur des bordures
            }]
          },
          options: {
            responsive: true, // Adapter la taille du graphique à l'écran
            scales: {
              y: {
                beginAtZero: true // Commencer l'axe Y à zéro
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes par statut:', error);
      }
    );
  }

  
  loadClientData() {
    this.apiService.getClientsByCity().subscribe(
      (response) => {
        console.log(response)
        const cities = response.map((item: any) => item.city);
        const clientCounts = response.map((item: any) => item.clientCount);

        this.clientChart = new Chart('clientChart', {
          type: 'bar',
          data: {
            labels: cities,
            datasets: [{
              label: 'Clients par Ville',
              data: clientCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des données des clients:', error);
      }
    );
  }
  public config:any = {
    type: 'bar',
    data: {
        labels: ["Catégorie A", "Catégorie B", "Catégorie C", "Catégorie D"],
        datasets: [{
            label: "Données statistiques",
            data: [120, 190, 300, 250],
            backgroundColor: ['blue', 'green', 'orange', 'red']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    },
  }
  
  ngOnInit(): void {
    this.fetchData();
    this.apiService.getMontures().subscribe(
      data => {
        this.topLunettes = data.sort((a, b) => a.Prix - b.Prix);
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );

    this.chart = new Chart('myChart',this.config)
    this.count_table_data("clients")
    this.count_table_data("montures")
    this.count_table_data("baskets")
    this.count_table_data("prescriptions")
    this.count_table_data("verres")

    this. loadClientData();
    this.loadOrdersByStatus()
    this.loadTables();
    this.loadMontureData()
    this.loadVerreData()
    this.loadUserTotals()

  }

  loadMontureData() {
    this.apiService.getMonturesByMarque().subscribe(
      (response) => {
        console.log(response);
        const marques = response.map((item: any) => item.marque);
        const montureCounts = response.map((item: any) => item.count);

        // Créer un graphique à barres
        this.montureChart = new Chart('montureChart', {
          type: 'bar',
          data: {
            labels: marques,
            datasets: [{
              label: 'Montures par Marque',
              data: montureCounts,
              backgroundColor: 'rgba(153, 102, 255, 0.2)', // Choisis la couleur que tu veux
              borderColor: 'rgba(153, 102, 255, 1)', // Choisis la couleur de la bordure
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des données des montures par marque:', error);
      }
    );
  }


  // Charger les tables de la base de données
  loadTables(): void {
    this.apiService.getTables().subscribe(
      (response) => {
        this.tables = response.tables;
      },
      (error) => {
        console.error('Erreur lors du chargement des tables:', error);
      }
    );
  }

  count_table_data(table) {
    this.apiService.getTableData(table).subscribe(
      (response) => {
        switch (table) {
          case "montures":
            this.count_montures = response.data.length;
            break;
          case "baskets":
            this.count_baskets = response.data.length;
            break;
          case "clients":
            this.count_clients = response.data.length;
            break;
          case "prescriptions":
            this.count_prescriptions = response.data.length;
            break;
          case "verres":
            this.count_glasses = response.data.length;
            break;
          default:
            console.log(`Table non gérée: ${table}`);
            break;
        }
      },
      (error) => {
        console.error(`Erreur lors du chargement de la table ${table}:`, error);
      }
    );
  }

  // Charger les données d'une table spécifique
  loadTableData(table: string): void {
    this.selectedTable = table;
    this.apiService.getTableData(table).subscribe(
      (response) => {
        this.tableData = response.data;
      },
      (error) => {
        console.error(`Erreur lors du chargement de la table ${table}:`, error);
      }
    );
  }

  // Supprimer une ligne
  deleteRow(id: string): void {
    this.apiService.deleteTableRow(this.selectedTable, id).subscribe(() => {
      this.loadTableData(this.selectedTable);
    });
  }

  // Ajouter une nouvelle ligne
  addRow(): void {
    this.apiService.addTableRow(this.selectedTable, this.newRow).subscribe(() => {
      this.showForm = false;
      this.newRow = {};
      this.loadTableData(this.selectedTable);
    });
  }

  
  // Afficher le formulaire d'ajout
  showAddForm(): void {
    this.showForm = true;
  }

  accessDataFrameStreamlit() {
    window.location.href = 'http://localhost:8501/';
  }
  
}
