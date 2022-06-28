export class ControlBase<T> {
  value: T|undefined;
  key: string;
  controlType: string;

  constructor(options: {
      value?: T;
      key?: string;
      controlType?: string;
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.controlType = options.controlType || '';
  }
}
