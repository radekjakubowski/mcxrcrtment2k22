import { TestBed } from '@angular/core/testing';

import { PersonControllerService } from './person-controller.service';

describe('PersonControllerService', () => {
  let service: PersonControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
