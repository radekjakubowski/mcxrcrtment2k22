import { ControlBase } from './../_utilitites/control-base';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class PersonFormGroupService {
  constructor() { }

  toFormGroup(controls: ControlBase<string>[] ) {
    const group: any = {};

    controls.forEach(control => {
      let controlToAdd = new FormControl(control.value || '');
      if (control.validators.find(v => v.name === 'required' && v.value === 'true')) {
        controlToAdd.setValidators(Validators.required);
      }

      group[control.key] = controlToAdd;
    });

    return new FormGroup(group);
  }
}
