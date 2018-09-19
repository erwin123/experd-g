import { TestBed, inject } from '@angular/core/testing';

import { CncService } from './cnc.service';

describe('CncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CncService]
    });
  });

  it('should be created', inject([CncService], (service: CncService) => {
    expect(service).toBeTruthy();
  }));
});
