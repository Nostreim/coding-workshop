import { createUuid, isUuid } from "../../utilities/uuid";
import { PurchaseOrder } from "./PurchaseOrder.entity";
import { PurchaseOrderLineItem } from "./PurchaseOrderLineItem.entity";

describe("Purcase Order Entity", () => {
  it("instantiates", () => {
    const purchaseOrder = new PurchaseOrder();
    const lineItem = new PurchaseOrderLineItem({
      id: createUuid(),
      purchaseOrderId: purchaseOrder.id,
      itemNumber: "F-123",
      description: "A fizzbob for the debopulator",
      price: 1000.15,
      quantity: 1,
    });
    expect(isUuid(lineItem.id)).toBeTruthy();
    expect(isUuid(lineItem.purchaseOrderId)).toBeTruthy();
    expect(lineItem.itemNumber).toBe("F-123");
    expect(lineItem.description).toBe("A fizzbob for the debopulator");
    expect(lineItem.price).toBe(1000.15);
    expect(lineItem.quantity).toBe(1);
  });
});
