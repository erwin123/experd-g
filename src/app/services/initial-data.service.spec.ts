import { TestBed, inject } from '@angular/core/testing';

import { InitialDataService } from './initial-data.service';

describe('InitialDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitialDataService]
    });
  });

  it('should be created', inject([InitialDataService], (service: InitialDataService) => {
    expect(service).toBeTruthy();
  }));
});
