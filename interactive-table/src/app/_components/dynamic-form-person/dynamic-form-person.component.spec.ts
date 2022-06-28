import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPersonComponent } from './dynamic-form-person.component';

describe('DynamicFormPersonComponent', () => {
  let component: DynamicFormPersonComponent;
  let fixture: ComponentFixture<DynamicFormPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
