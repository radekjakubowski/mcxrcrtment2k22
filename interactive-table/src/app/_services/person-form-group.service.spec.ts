import { TestBed } from '@angular/core/testing';
import { PersonFormGroupService } from './person-form-group.service';

describe('PersonFormGroupService', () => {
  let service: PersonFormGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonFormGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
