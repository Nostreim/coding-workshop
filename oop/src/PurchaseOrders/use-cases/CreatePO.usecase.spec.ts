import { createUuid } from "../../utilities/uuid";
import { PORepository } from "../infrastructure/repositories/PurchaseOrder.repo";
import { CreatePO } from "./CreatePO.usecase";

describe("CreatePO", () => {
  it("instantiates", () => {
    const repo = new PORepository();
    new CreatePO(repo);
  });

  it("creates a PO with line items", async () => {
    const repo = new PORepository();
    const useCase = new CreatePO(repo);

    const purchaseOrderId = createUuid();

    await useCase.execute({
      id: purchaseOrderId,
      lineItems: [
        {
          id: createUuid(),
          itemNumber: "F-123",
          description: "A fizzbob for the debopulator",
          price: 1000.15,
          quantity: 1,
        },
        {
          id: createUuid(),
          itemNumber: "D-160",
          description: "A debopulator",
          price: 20320.65,
          quantity: 1,
        },
      ],
    });
    const purchaseOrder = await repo.fetch(purchaseOrderId);
    expect(purchaseOrder?.id).toBe(purchaseOrderId);
    expect(purchaseOrder?.lineItems).toHaveLength(2);
    expect(purchaseOrder?.lineItems[0].itemNumber).toBe("F-123");
    expect(purchaseOrder?.lineItems[1].itemNumber).toBe("D-160");
  });
});
