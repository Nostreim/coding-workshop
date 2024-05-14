import { UseCase } from "../../lib/UseCase.base";
import { UUID, createUuid } from "../../utilities/uuid";
import { IPORepository } from "../domain/PurchaseOrder.repo-interface";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { CreatePOLineItemDTO } from "../infrastructure/dto/CreatePO.dto";

type CreatePOProps = {
  id: UUID;
  lineItems?: CreatePOLineItemDTO[];
};
export class CreatePO implements UseCase<CreatePOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ id, lineItems }: CreatePOProps) {
    const purchaseOrder = new PurchaseOrder({
      id,
      lineItems: lineItems?.map((lineItem) => ({
        id: createUuid(),
        itemNumber: lineItem.itemNumber,
        description: lineItem.description,
        price: lineItem.price,
        quantity: lineItem.quantity,
        purchaseOrderId: id,
      })),
    });
    await this.repo.save(purchaseOrder);
    return purchaseOrder.id;
  }
}
