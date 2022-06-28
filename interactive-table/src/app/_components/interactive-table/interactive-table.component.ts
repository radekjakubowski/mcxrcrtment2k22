import { ControlBase } from './../../_utilitites/control-base';
import { PersonController } from './../../_backend/_controller/person-controller.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../../_models/person';
import { PersonFormGroupService } from '../../_services/person-form-group.service';

@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.component.scss']
})
export class InteractiveTableComponent implements OnInit {
  public people$: Observable<Person[]> | undefined;
  //make use of text control

  constructor(private peopleController: PersonController, personFormGroupService: PersonFormGroupService) {
    this.people$ =  /* of(this.peopleController.getAll()); */ of(mockData);
  }

  ngOnInit(): void {
  }

  public getFormControlsForPerson(person: Person): Observable<ControlBase<string>[]> {
    let controls: ControlBase<string>[] = [];

    const props = Object.getOwnPropertyNames(person);

    props.forEach(prop => {
      let control: ControlBase<string> = new ControlBase<string>(
        {
          key: `${person.id}-${prop}`,
          value: person[prop],
          controlType: 'textbox'
        }
      )

      controls.push(control);
    })

    return of(controls);
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

