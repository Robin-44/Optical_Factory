import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../auth_config.json';
import { Observable } from 'rxjs';
import { Monture } from 'src/models/monture.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}


  // Ping method to check API connectivity
  ping$() {
    return this.http.get(`${config.apiUri}/api/external`);
  }
  getMonturesById(id: string): Observable<any> {
    return this.http.get<Monture>(`${config.apiUri}/api/monture/${id}`);
  }

  // **Clients Methods** (Si nécessaire pour récupérer des données liées aux clients)
  getClients$(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUri}/api/clients`);
  }

  // **Montures Methods** (Pour récupérer les données des montures)
  getMontures$(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiUri}/api/montures`);
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
