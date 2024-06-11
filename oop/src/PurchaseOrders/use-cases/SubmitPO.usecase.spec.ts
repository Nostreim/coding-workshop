import { PORepository } from "../infrastructure/repositories/PurchaseOrder.repo";
import { SubmitPO } from "./SubmitPO.usecase";

describe("SubmitPO", () => {
  it("instantiates", () => {
    const repo = new PORepository();
    new SubmitPO(repo);
  });
});
