import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';

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

  constructor(private apiService: ApiService) {}
  generateChart(): void {
    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item._id),
        datasets: [{
          label: 'Quantité',
          data: this.tableData.map(item => item.Quantity),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  
  ngOnInit(): void {
    this.loadTables();
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
}
