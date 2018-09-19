import { TestBed, inject } from '@angular/core/testing';

import { ProblemidentifyService } from './problemidentify.service';

describe('ProblemidentifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemidentifyService]
    });
  });

  it('should be created', inject([ProblemidentifyService], (service: ProblemidentifyService) => {
    expect(service).toBeTruthy();
  }));
});
