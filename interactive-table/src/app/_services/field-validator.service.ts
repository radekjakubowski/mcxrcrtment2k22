import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FieldValidatorService {
  public getValidationError(formControl: AbstractControl, fieldName: string): string {
    if (formControl.errors['required']) {
      return `${fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })} is required`;
    }

    if (formControl.errors['pattern']) {
      return `Numbers only`;
    }

    return '';
  }
}
