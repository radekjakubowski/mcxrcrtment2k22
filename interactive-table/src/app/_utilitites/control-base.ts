export class ControlBase<T> {
  value: T|undefined;
  key: string;
  controlType: string;
  disabled?: boolean;

  constructor(options: {
      value?: T;
      key?: string;
      controlType?: string;
      disabled?: boolean;
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.controlType = options.controlType || '';
    this.disabled = options.disabled || false;
  }
}
