import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {
  public createPersonForm: FormGroup;

  constructor(public modalRef: BsModalRef) {
    this.createForm();
   }

  ngOnInit(): void {
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
      phoneNumber: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    })
  }

  public createPerson() {

  }

}
