import { FieldValidatorService } from './../../_services/field-validator.service';
import { PersonFormGroupService } from './../../_services/person-form-group.service';
import { FormGroup } from '@angular/forms';
import { ControlBase } from './../../_utilitites/control-base';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Person } from '../../_models/person';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isEqual } from 'lodash';

@Component({
  selector: '[appPersonForm]',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  inputs: ["controls", "person"],
  outputs: ["deleteHandler"]
})
export class PersonFormComponent implements OnInit {
  userForm: FormGroup;
  public controls: ControlBase<string>[];
  public person: Person;
  public changesMade = false;
  public deleteHandler: EventEmitter<string> = new EventEmitter();
  public todaysDate: string;

  constructor(private pfgs: PersonFormGroupService, public validationService: FieldValidatorService) { }

  ngOnInit(): void {
    this.todaysDate = new Date().toISOString().split('T')[0];
    this.createForm();

    this.userForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(400)).subscribe((val: Partial<Person>) => {
      const currentPersonValue: Partial<Person> = val;
      const initialPersonValue: Partial<Person> = {...this.person};
      delete initialPersonValue['id'];

      this.changesMade = !isEqual(currentPersonValue, initialPersonValue) ? true : false;
    });
  }

  public createForm(): void {
    this.userForm = this.pfgs.toFormGroup(this.controls);
  }

  public deletePerson(): void {
    this.deleteHandler.emit(this.person.id);
  }
}
