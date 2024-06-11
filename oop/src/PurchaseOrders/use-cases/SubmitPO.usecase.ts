import { UseCase } from "../../lib/UseCase.base";
import { PONumber } from "../domain/PONumber.value-object";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { IPORepository } from "../domain/PurchaseOrder.repo-interface";

type SubmitPOProps = {
  purchaseOrder: PurchaseOrder;
};

export class SubmitPO implements UseCase<SubmitPOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ purchaseOrder }: SubmitPOProps) {
    // find the latest po number
    await this.repo.save(
      new PurchaseOrder({
        ...purchaseOrder,
        number: new PONumber("syn-000002"),
      })
    );
    return this.repo.fetch(purchaseOrder.id);
  }
}
