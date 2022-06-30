import { ShortAnswerComponent } from './../short-answer/short-answer.component';
import { FieldValidatorService } from './../../_services/field-validator.service';
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
  public people$: Observable<Person[]> | undefined;
  public personControls: Record<string, ControlBase<string>[]>;
  public people: Person[];

  @ViewChildren('personForm')
  private personFormComponents: QueryList<PersonFormComponent>;
  private personCreateModalRef: BsModalRef;
  private shortAnswerModalRef: BsModalRef;
  private readonly restrictedFields = ['id'];

  constructor(private peopleController: PersonController, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.people$ = of(this.peopleController.getAll());
    this.people$.pipe(take(1)).subscribe((people: Person[]) => this.people = people);
    this.personControls = this.prepareFormFields(this.people);
  }

  public handlePersonDelete(id: string): void {
    this.shortAnswerModalRef = this.modalService.show(ShortAnswerComponent, { initialState: { question: 'Do you want to delete this person?' }});

    this.shortAnswerModalRef.content?.answer?.pipe(take(1)).subscribe((answer: boolean) => {
      if (answer) {
        this.peopleController.delete(id);
        this.ngOnInit();
      }
    })
  }

  public checkForChanges(): boolean {
    return !(!!this.personFormComponents?.find((pfc: PersonFormComponent) => pfc.changesMade));
  }

  public anyFormInvalid(): boolean {
    return !!this.personFormComponents?.find((pfc: PersonFormComponent) => pfc.userForm.invalid);
  }

  public addNewPerson(): void {
    this.personCreateModalRef = this.modalService.show(CreatePersonComponent);

    this.personCreateModalRef?.content?.createdPersonEmitter.pipe(take(1)).subscribe((person: Person) => {
      this.peopleController.addNew(person);

      this.ngOnInit();
    })
  }

  public handleCancel(): void {
    this.shortAnswerModalRef = this.modalService.show(ShortAnswerComponent, { initialState: { question: 'Would you like to cancel?', description: 'If yes all changes made to the table will be lost' }});

    this.shortAnswerModalRef?.content?.answer.pipe(take(1)).subscribe((answer: boolean) => {
      if (answer) {
        this.personFormComponents.forEach((pfc: PersonFormComponent) => pfc.changesMade = false);
        this.ngOnInit();
      }
    })
  }

  public handleSave(): void {
    this.shortAnswerModalRef = this.modalService.show(ShortAnswerComponent, { initialState: { question: 'Would you like to save?', description: 'If yes all data will be saved and table will refresh itself' }});

    this.shortAnswerModalRef?.content?.answer.pipe(take(1)).subscribe((answer: boolean) => {
      if (answer) {
        const editedPeople: Person[] = this.personFormComponents.filter((pfc: PersonFormComponent) => pfc.changesMade).map((pfc: PersonFormComponent) => {
          const updatedValue = pfc.userForm.value;
          const id = pfc.person.id;

          return {...updatedValue, id} as Person;
        });

        editedPeople.forEach((person: Person) => {
          if (new Date(person.dateOfBirth) > new Date()) {
            window.alert(`People can't be born in future!`);
            return;
          }

          this.peopleController.update(person);
        })

        this.personFormComponents.forEach((pfc: PersonFormComponent) => pfc.changesMade = false);
        this.ngOnInit();
      }
    })
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

  private determineInputValidators(controlName: string): AbstractValidator[] {
    const validators: AbstractValidator[] = [];

    if (controlName !== 'apartmentNumber') {
      validators.push({name: 'required', value: 'true'});
    }

    if (controlName === 'phoneNumber') {
      validators.push({name: 'regex', value: '^[0-9]*$'});
    }

    return validators;
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
}
