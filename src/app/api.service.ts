import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../auth_config.json';
import { Monture } from 'src/models/monture.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Ping method to check API connectivity
  ping$() {
    return this.http.get(`${config.apiUri}/api/external`);
  }

  // Clients Methods
  createClient(clientData: any) {
    return this.http.post(`${config.apiUri}/api/clients`, clientData);
  }

  getClientById$(clientId: string) {
    return this.http.get(`${config.apiUri}/api/clients/${clientId}`);
  }

  updateClient(clientId: string, clientData: any) {
    return this.http.put(`${config.apiUri}/api/clients/${clientId}`, clientData);
  }

  deleteClient(clientId: string) {
    return this.http.delete(`${config.apiUri}/api/clients/${clientId}`);
  }

  // Montures Methods
  createMonture(montureData: any) {
    return this.http.post(`${config.apiUri}/api/montures`, montureData);
  }

  getClients$(): Observable<Monture[]> {
    return this.http.get<Monture[]>(`${config.apiUri}`);
  }

  getMontureById$(montureId: string) {
    return this.http.get(`${config.apiUri}/api/montures/${montureId}`);
  }

  updateMonture(montureId: string, montureData: any) {
    return this.http.put(`${config.apiUri}/api/montures/${montureId}`, montureData);
  }

  deleteMonture(montureId: string) {
    return this.http.delete(`${config.apiUri}/api/montures/${montureId}`);
  }

  // Verres Methods
  createVerre(verreData: any) {
    return this.http.post(`${config.apiUri}/api/verres`, verreData);
  }

  getVerres$() {
    return this.http.get(`${config.apiUri}/api/verres`);
  }

  getVerreById$(verreId: string) {
    return this.http.get(`${config.apiUri}/api/verres/${verreId}`);
  }

  updateVerre(verreId: string, verreData: any) {
    return this.http.put(`${config.apiUri}/api/verres/${verreId}`, verreData);
  }

  deleteVerre(verreId: string) {
    return this.http.delete(`${config.apiUri}/api/verres/${verreId}`);
  }

  // Commandes Methods
  createCommande(commandeData: any) {
    return this.http.post(`${config.apiUri}/api/commandes`, commandeData);
  }

  getCommandes$() {
    return this.http.get(`${config.apiUri}/api/commandes`);
  }

  getCommandeById$(commandeId: string) {
    return this.http.get(`${config.apiUri}/api/commandes/${commandeId}`);
  }

  updateCommande(commandeId: string, commandeData: any) {
    return this.http.put(`${config.apiUri}/api/commandes/${commandeId}`, commandeData);
  }

  deleteCommande(commandeId: string) {
    return this.http.delete(`${config.apiUri}/api/commandes/${commandeId}`);
  }

  // Prescriptions Methods
  createPrescription(prescriptionData: any) {
    return this.http.post(`${config.apiUri}/api/prescriptions`, prescriptionData);
  }

  getPrescriptions$() {
    return this.http.get(`${config.apiUri}/api/prescriptions`);
  }

  getPrescriptionById$(prescriptionId: string) {
    return this.http.get(`${config.apiUri}/api/prescriptions/${prescriptionId}`);
  }

  updatePrescription(prescriptionId: string, prescriptionData: any) {
    return this.http.put(`${config.apiUri}/api/prescriptions/${prescriptionId}`, prescriptionData);
  }

  deletePrescription(prescriptionId: string) {
    return this.http.delete(`${config.apiUri}/api/prescriptions/${prescriptionId}`);
  }
}
