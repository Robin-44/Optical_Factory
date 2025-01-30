import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})

export class FooterComponent {
  isExpanded = false;
  constructor(private router:Router,public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) {}
}
