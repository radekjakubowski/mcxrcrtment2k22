import { AbstractValidator } from './../_utilitites/abstract-validator';
import { ControlBase } from './../_utilitites/control-base';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class PersonFormGroupService {
  public toFormGroup(controls: ControlBase<string>[]): FormGroup {
    const group: Record<string, FormControl> = {};

    controls.forEach(control => {
      let controlToAdd = new FormControl(control.value || '');

      if (control.validators.find((v: AbstractValidator) => v.name === 'required' && v.value === 'true')) {
        controlToAdd.setValidators(Validators.required);
      }

      group[control.key] = controlToAdd;
    });

    return new FormGroup(group);
  }
}
