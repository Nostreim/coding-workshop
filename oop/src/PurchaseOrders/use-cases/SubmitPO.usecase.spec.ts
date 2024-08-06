import { createUuid } from "../../utilities/uuid";
import { PONumber } from "../domain/PONumber.value-object";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { PORepository } from "../infrastructure/repositories/PurchaseOrder.repo";
import { SubmitPO } from "./SubmitPO.usecase";

describe("SubmitPO", () => {
  it("instantiates", () => {
    const repo = new PORepository();
    new SubmitPO(repo);
  });

  it("starts with po number syn-000001", async () => {
    const id = createUuid();
    const repo = new PORepository();
    const submitPO = new SubmitPO(repo);
    const poToSubmit = new PurchaseOrder({
      id,
    });
    await repo.save(poToSubmit);

    await submitPO.execute({
      purchaseOrderId: poToSubmit.id,
    });
    const result = await repo.fetch(id);
    expect(result?.number?.value).toEqual(new PONumber("syn-000001").value);
  });

  it("increments the po number", async () => {
    const id = createUuid();
    const repo = new PORepository();
    const submitPO = new SubmitPO(repo);
    const existingPO = await repo.save(
      new PurchaseOrder({
        id: createUuid(),
        number: new PONumber("syn-000005"),
      })
    );
    const poToSubmit = new PurchaseOrder({
      id,
    });
    await repo.save(poToSubmit);

    await submitPO.execute({
      purchaseOrderId: poToSubmit.id,
    });
    const result = await repo.fetch(id);
    expect(result?.number?.value).toEqual(new PONumber("syn-000006").value);
  });

  it("throws an error if the purchase order does not exist", async () => {
    const repo = new PORepository();
    const submitPO = new SubmitPO(repo);
    const invalidUUID = createUuid();
    expect(submitPO.execute({ purchaseOrderId: invalidUUID })).rejects.toThrow(
      `Purchase Order with ID ${invalidUUID} not found`
    );
  });

  it("throws an error if the purchase order has already been submitted", async () => {
    const repo = new PORepository();
    const submitPO = new SubmitPO(repo);
    const poToSubmit = new PurchaseOrder({
      id: createUuid(),
      number: new PONumber("syn-000001"),
    });
    await repo.save(poToSubmit);
    expect(
      submitPO.execute({ purchaseOrderId: poToSubmit.id })
    ).rejects.toThrow("Submitted POs can't be assigned a new PO Number");
  });
});
