import { RandomStringService } from './../../_services/random-string.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Person } from '../../_models/person';
import { FieldValidatorService } from '../../_services/field-validator.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {
  public createPersonForm: FormGroup;
  public createdPersonEmitter: EventEmitter<Person> = new EventEmitter();

  constructor(public modalRef: BsModalRef, private rss: RandomStringService, private validationService: FieldValidatorService) {
    this.createForm();
   }

  ngOnInit(): void {
    this.createPersonForm.get('dateOfBirth').valueChanges.subscribe((date: string) => this.setAgeAccordingly(date))
  }

  private createForm(): void {
    this.createPersonForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      streetName: new FormControl('', Validators.required),
      houseNumber: new FormControl('', Validators.required),
      apartmentNumber: new FormControl(''),
      postalCode: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[0-9]*$'))]),
      dateOfBirth: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    })
  }

  public createPerson(): void {
    const formPerson: Person = this.createPersonForm.value;
    const newPerson: Person = {...formPerson, id: this.rss.randomString(10) }

    this.createdPersonEmitter.emit(newPerson);
    this.modalRef.hide();
  }

  public getValidationError(controlName: string): string {
    return this.validationService.getValidationError(this.createPersonForm.get(controlName), controlName);
  }

  public shouldDisplayError(controlName: string): boolean {
    const control = this.createPersonForm.get(controlName);
    return !!control?.errors && control.touched;
  }

  private setAgeAccordingly(date: string) {
    const personBirthDate = new Date(date);
    let timeDiff = Math.abs(Date.now() - personBirthDate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

    if (age) {
      this.createPersonForm.get('age').patchValue(age);
    }
  }
}
