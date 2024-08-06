import { createUuid, isUuid } from "../../utilities/uuid";
import { PONumber } from "./PONumber.value-object";
import { PurchaseOrder } from "./PurchaseOrder.entity";
import { PurchaseOrderLineItem } from "./PurchaseOrderLineItem.entity";

describe("Purchase Order Entity", () => {
  it("instantiates", () => {
    const PO = new PurchaseOrder();
    expect(isUuid(PO.id)).toBeTruthy();
  });

  it("instantiates with line items", () => {
    const poId = createUuid();
    const fizzBobLineItem = new PurchaseOrderLineItem({
      purchaseOrderId: poId,
      itemNumber: "F-123",
      description: "A fizzbob for the debopulator",
      price: 1000.15,
      quantity: 1,
    });
    const debopulatorLineItem = new PurchaseOrderLineItem({
      purchaseOrderId: poId,
      itemNumber: "D-160",
      description: "A debopulator",
      price: 20320.65,
      quantity: 1,
    });
    const purchaseOrder = new PurchaseOrder({
      id: poId,
      number: new PONumber("syn-000001"),
      lineItems: [fizzBobLineItem, debopulatorLineItem],
    });
    expect(purchaseOrder.lineItems.map((item) => item.id)).toEqual([
      fizzBobLineItem.id,
      debopulatorLineItem.id,
    ]);
  });

  it("throws an error if a submitted PO is assigned a new PO Number", () => {
    const po = new PurchaseOrder();
    const poNumber = new PONumber("syn-000001");
    po.submit(poNumber);
    expect(() => po.submit(poNumber)).toThrow(
      "Submitted POs can't be assigned a new PO Number"
    );
  });

  it("returns the status of the PO", () => {
    const po = new PurchaseOrder();
    expect(po.status).toEqual("draft");
    po.submit(new PONumber("syn-000001"));
    expect(po.status).toEqual("pending approval");
  });

  it("returns the purchaser id", () => {
    const purchaserId = createUuid();
    const po = new PurchaseOrder({
      purchasedBy: purchaserId,
    });
    expect(po.purchasedBy).toBe(purchaserId);
  });
});
