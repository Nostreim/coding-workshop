import { PONumber } from "./PONumber.value-object";

describe("PONumber", () => {
  it("is defined", () => {
    const poNumber = new PONumber("syn-123");
    expect(poNumber).toBeDefined();
  });

  it("throws an error if the value is not prefixed with 'syn-'", () => {
    expect(() => new PONumber("123" as `syn-${number}`)).toThrow(
      "Purchase Order Number must be prefixed with 'syn-'"
    );
  });
});
