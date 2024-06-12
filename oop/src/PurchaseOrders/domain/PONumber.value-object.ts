export type PrefixedNumber = `syn-${number}`;

export class PONumber {
  private _value: PrefixedNumber;
  private _digits: number;
  private _prefix: string = "syn-";
  constructor(value: PrefixedNumber) {
    if (!value.startsWith("syn-")) {
      throw new Error("Purchase Order Number must be prefixed with 'syn-'");
    }

    if (value.length !== 10) {
      throw new Error(
        `Purchase Order Number must be 6 digits (expected syn-000001 but received ${value})`
      );
    }

    const [_prefix, digits] = value.split("-");

    this._value = value;
    this._digits = parseInt(digits);
    this._prefix = _prefix;
  }
  get value() {
    return this._value;
  }
  get digits() {
    return this._digits;
  }
  increment() {
    const nextNumber = this._digits + 1;
    return new PONumber(
      `syn-${nextNumber.toString().padStart(6, "0")}` as PrefixedNumber
    );
  }
}
