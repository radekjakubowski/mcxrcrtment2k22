import { PersonFormComponent } from './../person-form/person-form.component';
import { ControlBase } from './../../_utilitites/control-base';
import { PersonController } from './../../_backend/_controller/person-controller.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../../_models/person';
import { PersonFormGroupService } from '../../_services/person-form-group.service';

@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.scss']
})
export class InteractiveTableComponent implements OnInit {
  @ViewChildren('personForm')
  personFormComponents: QueryList<PersonFormComponent>;

  public people$: Observable<Person[]> | undefined;
  public personControls: Record<string, ControlBase<string>[]>;
  private people: Person[] = mockData;
  private restrictedFields = ['id'];
  //make use of text control

  constructor(private peopleController: PersonController, personFormGroupService: PersonFormGroupService) {
    this.people$ =  /* of(this.peopleController.getAll()); */ of(mockData);
  }

  ngOnInit(): void {
    this.personControls = this.prepareFormFields(this.people);
  }

  private prepareFormFields(people: Person[]): Record<string, ControlBase<string>[]> {
    let allFormControls: Record<string, ControlBase<string>[]> = {};

    people.forEach(person => {
      let controls: ControlBase<string>[] = [];
      const props = Object.getOwnPropertyNames(person);

      props.forEach(prop => {
        let control: ControlBase<string> = new ControlBase<string>(
          {
            key: `${prop}`,
            value: person[prop],
            controlType: 'textbox',
            disabled: `${prop}` === 'age' ? true : false,
          }
        )

        if (!this.restrictedFields.includes(control.key)) {
          controls.push(control);
        }
      })

      allFormControls[person.id] = controls;
      controls = null;
    })


    return allFormControls;
  }

  public handlePersonDelete($event) {
    let personToDelete = this.people.find(person => person.id === $event);
    let index = this.people.indexOf(personToDelete);

    this.people.splice(index, 1);
    this.ngOnInit();
  }
}

const mockData: Person[] = [
  {
    id: 'xyz1',
    firstName: 'xyz',
    lastName: 'xyz',
    streetName: 'xyz',
    houseNumber: 'xyz',
    apartmentNumber: 'xyz',
    postalCode: 'xyz',
    town: 'xyz',
    phoneNumber: 'xyz',
    dateOfBirth: 'xyz',
    age: 22,
  },
  {
    id: 'xyz2',
    firstName: 'xyz',
    lastName: 'xyz',
    streetName: 'xyz',
    houseNumber: 'xyz',
    apartmentNumber: 'xyz',
    postalCode: 'xyz',
    town: 'xyz',
    phoneNumber: 'xyz',
    dateOfBirth: 'xyz',
    age: 22,
  },
  {
    id: 'xyz3',
    firstName: 'xyz',
    lastName: 'xyz',
    streetName: 'xyz',
    houseNumber: 'xyz',
    apartmentNumber: 'xyz',
    postalCode: 'xyz',
    town: 'xyz',
    phoneNumber: 'xyz',
    dateOfBirth: 'xyz',
    age: 22,
  },
  {
    id: 'xyz4',
    firstName: 'xyz',
    lastName: 'xyz',
    streetName: 'xyz',
    houseNumber: 'xyz',
    apartmentNumber: 'xyz',
    postalCode: 'xyz',
    town: 'xyz',
    phoneNumber: 'xyz',
    dateOfBirth: 'xyz',
    age: 22,
  }
]

