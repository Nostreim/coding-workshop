export class PONumber {
  private _value: `syn-${number}`;
  constructor(value: `syn-${number}`) {
    if (!value.startsWith("syn-")) {
      throw new Error("Purchase Order Number must be prefixed with 'syn-'");
    }

    this._value = value;
  }
  get value() {
    return this._value;
  }
}
