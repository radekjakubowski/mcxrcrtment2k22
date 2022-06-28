import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonFormGroupService } from '../../_services/person-form-group.service';
import { ControlBase } from '../../_utilitites/control-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() controls: ControlBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';

  constructor(private pcs: PersonFormGroupService) {}

  ngOnInit() {
    this.form = this.pcs.toFormGroup(this.controls as ControlBase<string>[]);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
