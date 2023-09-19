import { Component } from '@angular/core';
import { AzureDemoService } from '../azure-demo.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  report$ = this.azureDemoService.getReportNoAuth().pipe(
    tap(report => {
      console.log(report);
    })
  );

  constructor(private azureDemoService: AzureDemoService) {}
}
