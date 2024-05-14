import { createUuid, isUuid } from "../../utilities/uuid";
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
      lineItems: [fizzBobLineItem, debopulatorLineItem],
    });
    expect(purchaseOrder.lineItems.map((item) => item.id)).toEqual([
      fizzBobLineItem.id,
      debopulatorLineItem.id,
    ]);
  });
});
