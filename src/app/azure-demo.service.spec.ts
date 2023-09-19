import { TestBed } from '@angular/core/testing';

import { AzureDemoService } from './azure-demo.service';

describe('AzureDemoService', () => {
  let service: AzureDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
