import { AbstractValidator } from './../../_utilitites/abstract-validator';
import { CreatePersonComponent } from './../create-person/create-person.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PersonFormComponent } from './../person-form/person-form.component';
import { ControlBase } from './../../_utilitites/control-base';
import { PersonController } from './../../_backend/_controller/person-controller.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from '../../_models/person';
import { take } from 'rxjs/operators';

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
  public personCreateModalRef: BsModalRef;
  public people: Person[];
  private readonly restrictedFields = ['id'];

  constructor(private peopleController: PersonController, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.people$ = of(this.peopleController.getAll());  /* of(mockData) */;
    this.people$.pipe(take(1)).subscribe(people => this.people = people);
    this.personControls = this.prepareFormFields(this.people);
  }

  private prepareFormFields(people: Person[]): Record<string, ControlBase<string>[]> {
    let allFormControls: Record<string, ControlBase<string>[]> = {};

    people.forEach((person: Person) => {
      let controls: ControlBase<string>[] = [];
      const props: string[] = Object.getOwnPropertyNames(person);

      props.forEach((prop: string) => {
        const controlName: string = `${prop}`;

        let control: ControlBase<string> = new ControlBase<string>(
          {
            key: controlName,
            value: person[controlName],
            controlType: this.determineInputType(controlName),
            disabled: this.determineInputDisabledState(controlName),
            validators: this.determineInputValidators(controlName)
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
    this.peopleController.delete($event);

    this.ngOnInit();
  }

  public checkForChanges(): boolean {
    return !(!!this.personFormComponents?.find(c => c.changesMade));
  }

  public anyFormInvalid(): boolean {
    return !!this.personFormComponents?.find(c => c.userForm.invalid);
  }

  public addNewPerson(): void {
    this.personCreateModalRef = this.modalService.show(CreatePersonComponent);

    this.personCreateModalRef?.content?.createdPersonEmitter.pipe(take(1)).subscribe(person => {
      this.peopleController.addNew(person);

      this.ngOnInit();
    })
  }

  public reloadData() {
    this.personFormComponents.forEach(pfc => pfc.changesMade = false);
    this.ngOnInit();
  }

  public saveChanges() {
    const editedPeople: Person[] = this.personFormComponents.filter(pfc => pfc.changesMade).map(pfc => {
      const updatedValue = pfc.userForm.value;
      const id = pfc.person.id;

      return {...updatedValue, id} as Person;
    });

    editedPeople.forEach(person => {
      this.peopleController.update(person);
    })

    this.personFormComponents.forEach(pfc => pfc.changesMade = false);
    this.ngOnInit();
  }

  private determineInputType(controlName: string): string {
    if (controlName === 'dateOfBirth') {
      return 'date'
    }

    return 'textbox';
  }

  private determineInputDisabledState(controlName: string): boolean {
    if (controlName === 'age') {
      return true;
    }

    return false;
  }

  determineInputValidators(controlName: string): AbstractValidator[] {
    const validators: AbstractValidator[] = [];

    if (controlName !== 'apartmentNumber') {
      validators.push({name: 'required', value: 'true'});
    }

    return validators;
  }
}

