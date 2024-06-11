import { PONumber } from "./PONumber.value-object";

describe("PONumber", () => {
  it("is defined", () => {
    const poNumber = new PONumber("syn-123");
    expect(poNumber).toBeDefined();
  });
});
