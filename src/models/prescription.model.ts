export interface Prescription {
  _id?: string; // Optional
  clientID: string;  // Client associated with the prescription
  verreType: string; // Type of glass prescribed
  prescriptionDetails: string; // Example: "Right eye: -2.5, Left eye: -3.0"
  issueDate: string;
  createdAt?: string;
  updatedAt?: string;
}
