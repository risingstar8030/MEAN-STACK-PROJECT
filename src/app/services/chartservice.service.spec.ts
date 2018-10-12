import { TestBed, inject } from '@angular/core/testing';

import { ChartserviceService } from './chartservice.service';

describe('ChartserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartserviceService]
    });
  });

  it('should be created', inject([ChartserviceService], (service: ChartserviceService) => {
    expect(service).toBeTruthy();
  }));
});
