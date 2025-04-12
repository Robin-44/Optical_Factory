export interface Client {
  _id?: string; // Optional, for the case of updates and new creation
  name: string;
  email: string;
  phone: string;
  address: string;
  sub:string;
  createdAt?: string; // Optional, could be added by the backend
  updatedAt?: string; // Optional, could be added by the backend
  
}
