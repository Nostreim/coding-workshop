import { UseCase } from "../../lib/UseCase.base";
import { UUID, createUuid } from "../../utilities/uuid";
import { IPORepository } from "../domain/PurchaseOrder.repo-interface";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { CreatePOLineItemDTO } from "../infrastructure/dto/CreatePO.dto";
import { PurchaseOrderLineItem } from "../domain/PurchaseOrderLineItem.entity";

type CreatePOProps = {
  id: UUID;
  lineItems?: CreatePOLineItemDTO[];
};
export class CreatePO implements UseCase<CreatePOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ id, lineItems }: CreatePOProps) {
    const purchaseOrder = new PurchaseOrder({
      id,
      lineItems: lineItems?.map(
        (lineItem) =>
          new PurchaseOrderLineItem({
            id: createUuid(),
            purchaseOrderId: id,
            itemNumber: lineItem.itemNumber,
            description: lineItem.description,
            price: lineItem.price,
            quantity: lineItem.quantity,
          })
      ),
    });
    await this.repo.save(purchaseOrder);
    return purchaseOrder.id;
  }
}
