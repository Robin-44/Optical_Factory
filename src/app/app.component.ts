import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IpService } from './services/ip.service';
import { TrackingService } from './services/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  userIp: string = '';
  totalLoginDuration: number = 0;
  currentPageDuration: number = 0;
  pageCount: number = 0;

  constructor(private ipService: IpService, private trackingService: TrackingService) {}

  ngOnInit() {
    this.ipService.getIp().subscribe((data: any) => {
      this.userIp = data;
      console.log("Adresse IP :", this.userIp);
    });

    this.trackingService.startTracking();

    this.trackingService.getPageCountObservable().subscribe(count => {
      this.pageCount = count;
    });

    setInterval(() => this.updateTimers(), 1000);
  }

  updateTimers() {
    this.totalLoginDuration = this.trackingService.getTotalTimeSpent();
    this.currentPageDuration = this.trackingService.getCurrentPageTime();
  }
}
