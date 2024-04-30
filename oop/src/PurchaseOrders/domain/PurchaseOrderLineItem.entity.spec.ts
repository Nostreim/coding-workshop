import { createUuid, isUuid } from "../../utilities/uuid";
import { PurchaseOrder } from "./PurchaseOrder.entity";
import { PurchaseOrderLineItem } from "./PurchaseOrderLineItem.entity";

describe("Purcase Order Entity", () => {
  it("instantiates", () => {
    const purchaseOrder = new PurchaseOrder();
    const lineItem = new PurchaseOrderLineItem({
      id: createUuid(),
      purchaseOrderId: purchaseOrder.id,
    });
    expect(isUuid(lineItem.id)).toBeTruthy();
    expect(isUuid(lineItem.purchaseOrderId)).toBeTruthy();
  });
});
