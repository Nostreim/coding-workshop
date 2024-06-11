export class PONumber {
  private _value: `syn-${number}`;
  constructor(value: `syn-${number}`) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
}
