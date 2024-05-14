import { UseCase } from "../../lib/UseCase.base";
import { UUID, createUuid } from "../../utilities/uuid";
import { IPORepository } from "../domain/IPORepository";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { CreatePOLineItemDTO } from "../infrastructure/dto/CreatePO.dto";

type CreatePOProps = {
  id: UUID;
  lineItems: CreatePOLineItemDTO[];
};
export class CreatePO implements UseCase<CreatePOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ id, lineItems }: CreatePOProps) {
    const purchaseOrderId = createUuid();
    const purchaseOrder = new PurchaseOrder({
      id: purchaseOrderId,
      lineItems: lineItems.map((lineItem) => ({
        id: createUuid(),
        itemNumber: lineItem.itemNumber,
        description: lineItem.description,
        price: lineItem.price,
        quantity: lineItem.quantity,
        purchaseOrderId,
      })),
    });
    await this.repo.save(purchaseOrder);
    return purchaseOrder.id;
  }
}
