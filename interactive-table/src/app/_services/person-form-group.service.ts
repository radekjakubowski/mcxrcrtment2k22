import { AbstractValidator } from './../_utilitites/abstract-validator';
import { ControlBase } from './../_utilitites/control-base';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Injectable()
export class PersonFormGroupService {
  public toFormGroup(controls: ControlBase<string>[]): FormGroup {
    const group: Record<string, FormControl> = {};

    controls.forEach(control => {
      let controlToAdd = new FormControl(control.value || '');
      let validatorFns: ValidatorFn[] = [];

      if (control.validators.find((v: AbstractValidator) => v.name === 'required' && v.value === 'true')) {
        validatorFns.push(Validators.required);
      }

      if (control.validators.find((v: AbstractValidator) => v.name === 'regex')) {
        const regex = control.validators.find((v: AbstractValidator) => v.name === 'regex').value;

        validatorFns.push(Validators.pattern(new RegExp(regex)));
      }

      controlToAdd.setValidators(validatorFns);
      group[control.key] = controlToAdd;
    });

    return new FormGroup(group);
  }
}
