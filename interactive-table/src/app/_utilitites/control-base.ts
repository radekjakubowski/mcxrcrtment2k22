import { AbstractValidator } from './abstract-validator';
export class ControlBase<T> {
  value: T|undefined;
  key: string;
  controlType: string;
  disabled?: boolean;
  validators?: AbstractValidator[];

  constructor(options: {
      value?: T;
      key?: string;
      controlType?: string;
      disabled?: boolean;
      validators?: AbstractValidator[]
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.controlType = options.controlType || '';
    this.disabled = options.disabled || false;
    this.validators = options.validators || null
  }
}
