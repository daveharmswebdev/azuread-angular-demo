import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { filter, Subject, takeUntil } from 'rxjs';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { environment } from '../environments/environment';
import { AzureDemoService } from './azure-demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private azureDemoService: AzureDemoService
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isUserLoggedIn =
          this.authService.instance.getAllAccounts().length > 0;
        this.azureDemoService.isUserLoggedIn.next(this.isUserLoggedIn);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...(this.msalGuardConfig.authRequest as RedirectRequest),
      });
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.postLogoutUrl,
    });
  }
}
