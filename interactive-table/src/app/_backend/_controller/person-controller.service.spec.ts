import { TestBed } from '@angular/core/testing';
import { PersonController } from './person-controller.service';

describe('PersonControllerService', () => {
  let service: PersonController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
