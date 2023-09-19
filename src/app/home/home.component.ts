import { Component, OnDestroy, OnInit } from '@angular/core';
import { AzureDemoService } from '../azure-demo.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private readonly destroy$ = new Subject<void>();

  constructor(private azureDemoService: AzureDemoService) {}

  ngOnInit(): void {
    this.azureDemoService.isUserLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
