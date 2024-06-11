import { PONumber } from "./PONumber.value-object";

describe("PONumber", () => {
  it("is defined", () => {
    const poNumber = new PONumber("syn-000001");
    expect(poNumber).toBeDefined();
  });

  it("throws an error if the value is not prefixed with 'syn-'", () => {
    expect(() => new PONumber("123" as `syn-${number}`)).toThrow(
      "Purchase Order Number must be prefixed with 'syn-'"
    );
  });

  it("throws if the number is more than 6 digits", () => {
    expect(() => new PONumber("syn-1234567")).toThrow(
      `Purchase Order Number must be 6 digits (expected syn-000001 but received syn-1234567)`
    );
  });
});
