import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class HelpComponent {
  // Tableau des questions et réponses
  faqItems = [
    {
      question: "Comment passer une commande ?",
      answer: "Pour passer une commande, il vous suffit de sélectionner les produits que vous souhaitez acheter, de les ajouter à votre panier, puis de suivre les étapes de paiement sur notre site.",
      isOpen: false
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les paiements par carte bancaire (Visa, MasterCard), PayPal, ainsi que par virement bancaire.",
      isOpen: false
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Une fois votre commande expédiée, vous recevrez un email contenant un numéro de suivi. Vous pourrez utiliser ce numéro sur notre site pour suivre l'état de la livraison.",
      isOpen: false
    },
    {
      question: "Puis-je modifier ou annuler ma commande ?",
      answer: "Une fois votre commande validée, vous pouvez la modifier ou l'annuler dans un délai de 30 minutes. Après ce délai, la commande sera traitée et il ne sera plus possible de la modifier.",
      isOpen: false
    },
    {
      question: "Que faire si mon article est endommagé ou défectueux ?",
      answer: "Si vous recevez un article endommagé ou défectueux, veuillez contacter notre service client dans les 48 heures suivant la réception de votre commande pour organiser un retour ou un échange.",
      isOpen: false
    }
  ];

  // Fonction pour basculer l'état de visibilité d'une réponse
  toggleAnswer(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }

}
