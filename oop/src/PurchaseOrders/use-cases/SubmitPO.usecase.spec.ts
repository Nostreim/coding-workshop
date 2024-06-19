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
      purchaseOrder: poToSubmit,
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
      purchaseOrder: poToSubmit,
    });
    const result = await repo.fetch(id);
    expect(result?.number?.value).toEqual(new PONumber("syn-000006").value);
  });
});
