export interface Monture {
  _id?: string; // Optional
  name: string;
  material: string;
  color: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  test:string;
  verreID?: string; // Optional, referencing the verre object
}
