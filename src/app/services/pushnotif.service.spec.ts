import { TestBed, inject } from '@angular/core/testing';

import { PushnotifService } from './pushnotif.service';

describe('PushnotifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushnotifService]
    });
  });

  it('should be created', inject([PushnotifService], (service: PushnotifService) => {
    expect(service).toBeTruthy();
  }));
});
