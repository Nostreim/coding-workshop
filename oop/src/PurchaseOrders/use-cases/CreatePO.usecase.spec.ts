import { createUuid } from "../../utilities/uuid";
import { PurchaserDTO } from "../infrastructure/dto/Purchaser.dto";
import { PORepository } from "../infrastructure/repositories/PurchaseOrder.repo";
import { CreatePO } from "./CreatePO.usecase";

describe("CreatePO", () => {
  it("instantiates", () => {
    const repo = new PORepository();
    new CreatePO(repo);
  });

  it("creates a PO", async () => {
    const repo = new PORepository();
    const useCase = new CreatePO(repo);

    const purchaseOrderId = createUuid();

    await useCase.execute({
      id: purchaseOrderId,
      purchaser: {
        id: createUuid(),
        firstName: "Jo",
        lastName: "Shmo",
      },
    });
    const purchaseOrder = await repo.fetch(purchaseOrderId);
    expect(purchaseOrder?.id).toBe(purchaseOrderId);
    expect(purchaseOrder?.lineItems).toHaveLength(0);
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
      purchaser: {
        id: createUuid(),
        firstName: "Jo",
        lastName: "Shmo",
      },
    });
    const purchaseOrder = await repo.fetch(purchaseOrderId);
    expect(purchaseOrder?.id).toBe(purchaseOrderId);
    expect(purchaseOrder?.lineItems).toHaveLength(2);
    expect(purchaseOrder?.lineItems[0].itemNumber).toBe("F-123");
    expect(purchaseOrder?.lineItems[1].itemNumber).toBe("D-160");
  });

  it("records the purchaser", async () => {
    const repo = new PORepository();
    const useCase = new CreatePO(repo);

    const purchaseOrderId = createUuid();
    const purchaserId = createUuid();

    await useCase.execute({
      id: purchaseOrderId,
      purchaser: {
        id: purchaserId,
        firstName: "Jo",
        lastName: "Shmo",
      },
    });

    const purchaseOrder = await repo.fetch(purchaseOrderId);
    expect(purchaseOrder?.purchasedBy).toBe(purchaserId);
  });
});
