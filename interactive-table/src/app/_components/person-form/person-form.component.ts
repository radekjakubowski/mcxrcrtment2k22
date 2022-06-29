import { PersonFormGroupService } from './../../_services/person-form-group.service';
import { FormGroup } from '@angular/forms';
import { ControlBase } from './../../_utilitites/control-base';
import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: '[appPersonForm]',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  inputs: ["controls", "personId"],
  outputs: ["deleteHandler"]
})
export class PersonFormComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;
  public controls: ControlBase<string>[];
  public personId: any;
  public deleteHandler: EventEmitter<string> = new EventEmitter();

  constructor(private pfgs: PersonFormGroupService) { }

  ngAfterViewInit(): void {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.userForm = this.pfgs.toFormGroup(this.controls);
  }

  deletePerson(id: number) {
    this.deleteHandler.emit(this.personId);
  }
}
