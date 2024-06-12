import { UseCase } from "../../lib/UseCase.base";
import { PONumber } from "../domain/PONumber.value-object";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { IPORepository } from "../domain/PurchaseOrder.repo-interface";

type SubmitPOProps = {
  purchaseOrder: PurchaseOrder;
};

export class SubmitPO implements UseCase<SubmitPOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ purchaseOrder }: { purchaseOrder: PurchaseOrder }) {
    const lastPO = await this.repo.fetchLastPOByNumber();
    await this.repo.save(
      new PurchaseOrder({
        id: purchaseOrder.id,
        number: lastPO?.number?.increment(),
        lineItems: purchaseOrder.lineItems,
      })
    );
  }
}
