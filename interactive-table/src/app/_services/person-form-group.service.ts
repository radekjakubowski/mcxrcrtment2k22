import { ControlBase } from './../_utilitites/control-base';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class PersonFormGroupService {
  constructor() { }

  toFormGroup(controls: ControlBase<string>[] ) {
    const group: any = {};

    controls.forEach(control => {
      group[control.key] = new FormControl(control.value || '');
    });

    return new FormGroup(group);
  }
}
