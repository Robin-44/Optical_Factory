import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../auth_config.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { Monture } from 'src/models/monture.model';
import { Basket } from 'src/models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

   // Obtenir toutes les tables disponibles dans la base de données
   getTables(): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/tables`);
  }

  // Obtenir les données d'une table spécifique
  getTableData(tableName: string): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/tables/${tableName}`);
  }

  // Supprimer une ligne d'une table
  deleteTableRow(tableName: string, id: string): Observable<any> {
    return this.http.delete(`${config.apiUri}/api/tables/${tableName}/${id}`);
  }

  // Ajouter une nouvelle ligne dans une table
  addTableRow(tableName: string, data: any): Observable<any> {
    return this.http.post(`${config.apiUri}/api/tables/${tableName}`, data);
  }


  getMontures(): Observable<Monture[]> {
    return this.http.get<Monture[]>(`${config.apiUri}/api/montures`);
  }

  getVerres(): Observable<string[]> {
    return this.http.get<string[]>(`${config.apiUri}/api/verres`);
  }
  register(userData: { username: string; email: string; sub: string }): Observable<any> {
    console.log('User data being sent:', userData);  // Affiche les données avant l'envoi
    return this.http.post(`${config.apiUri}/api/register`, userData);
  }
  // Ping method to check API connectivity
  ping$() {
    return this.http.get(`${config.apiUri}/api/external`);
  }
  getMonturesById(id: string): Observable<any> {
    return this.http.get<Monture>(`${config.apiUri}/api/monture/${id}`);
  }
  reduceMontureQuantity(montureId: string): Observable<any> {
    return this.http.post<any>(`${config.apiUri}/api/reduce_monture_quantity`, { montureId });
  }
  
  checkout(): Observable<any> {
    return this.http.post<any>(`${config.apiUri}/api/checkout`, {});
  }
  
  getCountMontureToBasket(): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/panier/count/`);
  }

  getCountBasketByMonture(montureId:String): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/panier/count/`+montureId);
  }
  getRecommendationsFromBasket(): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/recommendations/panier`);
  }

  
  getBasketUser(){
    return this.http.get<any>(`${config.apiUri}/api/get_basket`);
  }

  // **Clients Methods** (Si nécessaire pour récupérer des données liées aux clients)
  getClients$(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUri}/api/clients`);
  }

  postAddToOrder(basket: Basket): Observable<String> {
    console.log(basket)
    return this.http.post<String>(`${config.apiUri}/api/add_monture_to_basket`, basket);
  }
  
  // **Montures Methods** (Pour récupérer les données des montures)
  getMontures$(): Observable<Monture[]> {
    return this.http.get<Monture[]>(`${config.apiUri}/api/montures`);
  }


  // **Verres Methods** (Pour récupérer les données des verres)
  getVerres$(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUri}/api/verres`);
  }

  getVerreById$(verreId: string): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/verres/${verreId}`);
  }

  // **Commandes Methods** (Pour récupérer les données des commandes)
  getCommandes$(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUri}/api/commandes`);
  }

  getCommandeById$(commandeId: string): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/commandes/${commandeId}`);
  }

  // **Prescriptions Methods** (Non utilisé ici, mais vous pouvez l'utiliser pour gérer les prescriptions)
  getPrescriptions$(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUri}/api/prescriptions`);
  }

  getPrescriptionById$(prescriptionId: string): Observable<any> {
    return this.http.get<any>(`${config.apiUri}/api/prescriptions/${prescriptionId}`);
  }
}
