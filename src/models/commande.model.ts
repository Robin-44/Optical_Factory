export interface Commande {
  _id?: string; // Optional
  clientID: string;  // The ID of the client making the order
  montureID: string; // The ID of the monture
  verreID: string;   // The ID of the verre
  orderDate: string;
  status: string;    // Could be something like 'Pending', 'Shipped', etc.
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
