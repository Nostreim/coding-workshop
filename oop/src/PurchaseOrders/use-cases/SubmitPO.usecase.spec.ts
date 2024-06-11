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

  it("submits a PO successfully", async () => {
    const repo = new PORepository();
    const submitPO = new SubmitPO(repo);
    const result = await submitPO.execute({
      purchaseOrder: new PurchaseOrder(),
    });
    expect(result?.number?.value).toEqual(new PONumber("syn-000002").value);
  });
});
