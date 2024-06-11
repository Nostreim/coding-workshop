export class PONumber {
  private _value: `syn-${number}`;
  constructor(value: `syn-${number}`) {
    if (!value.startsWith("syn-")) {
      throw new Error("Purchase Order Number must be prefixed with 'syn-'");
    }

    if (value.length !== 10) {
      throw new Error(
        `Purchase Order Number must be 6 digits (expected syn-000001 but received ${value})`
      );
    }

    this._value = value;
  }
  get value() {
    return this._value;
  }
}
