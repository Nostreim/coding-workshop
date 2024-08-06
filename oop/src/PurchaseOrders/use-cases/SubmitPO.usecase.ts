import { UseCase } from "../../lib/UseCase.base";
import { EntityMissing } from "../../utilities/error/EntityMissing";
import { UUID } from "../../utilities/uuid";
import { PONumber } from "../domain/PONumber.value-object";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { IPORepository } from "../domain/PurchaseOrder.repo-interface";

type SubmitPOProps = {
  purchaseOrderId: UUID;
};

export class SubmitPO implements UseCase<SubmitPOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ purchaseOrderId }: SubmitPOProps) {
    const purchaseOrder = await this.repo.fetch(purchaseOrderId);

    if (!purchaseOrder) {
      throw new EntityMissing(
        `Purchase Order with ID ${purchaseOrderId} not found`
      );
    }

    const lastPO = await this.repo.fetchLastPOByNumber();
    const nextPONumber =
      lastPO?.number?.increment() ?? new PONumber("syn-000001");

    purchaseOrder?.submit(nextPONumber);

    await this.repo.save(purchaseOrder);
  }
}
