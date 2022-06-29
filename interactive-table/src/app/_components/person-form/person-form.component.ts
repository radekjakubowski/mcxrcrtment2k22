import { PersonFormGroupService } from './../../_services/person-form-group.service';
import { FormGroup } from '@angular/forms';
import { ControlBase } from './../../_utilitites/control-base';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Person } from '../../_models/person';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { isEqual, unset } from 'lodash';

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

  constructor(private pfgs: PersonFormGroupService) { }

  ngOnInit(): void {
    this.createForm();

    this.userForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(400)).subscribe((val: Partial<Person>) => {
      const currentPersonValue: Partial<Person> = val;
      const initialPersonValue: Partial<Person> = {...this.person};
      delete initialPersonValue['id'];

      this.changesMade = !isEqual(currentPersonValue, initialPersonValue) ? true : false;
    });
  }

  createForm() {
    this.userForm = this.pfgs.toFormGroup(this.controls);
  }

  deletePerson(id: number) {
    this.deleteHandler.emit(this.person.id);
  }

  patchControlValue(formControlName: string, event: Event) {
    const element = event.currentTarget as HTMLInputElement;

    this.userForm.get(formControlName).patchValue(element.value);
  }
}
