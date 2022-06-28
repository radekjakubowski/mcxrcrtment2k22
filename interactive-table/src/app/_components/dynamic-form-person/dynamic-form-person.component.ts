import { ControlBase } from './../../_utilitites/control-base';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-person',
  templateUrl: './dynamic-form-person.component.html',
  styleUrls: ['./dynamic-form-person.component.scss']
})
export class DynamicFormPersonComponent {
  @Input() control!: ControlBase<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.control.key].valid; }
}
