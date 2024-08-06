import { UseCase } from "../../lib/UseCase.base";
import { UUID } from "../../utilities/uuid";
import { IPORepository } from "../domain/PurchaseOrder.repo-interface";
import { PurchaseOrder } from "../domain/PurchaseOrder.entity";
import { CreatePOLineItemDTO } from "../infrastructure/dto/CreatePO.dto";
import { PurchaseOrderLineItem } from "../domain/PurchaseOrderLineItem.entity";
import { PurchaserDTO } from "../infrastructure/dto/Purchaser.dto";

type CreatePOProps = {
  id: UUID;
  lineItems?: CreatePOLineItemDTO[];
  purchaser: PurchaserDTO;
};
export class CreatePO implements UseCase<CreatePOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ id, lineItems, purchaser }: CreatePOProps) {
    const purchaseOrder = new PurchaseOrder({
      id,
      lineItems: lineItems?.map(
        (lineItem) =>
          new PurchaseOrderLineItem({
            id: lineItem.id,
            purchaseOrderId: id,
            itemNumber: lineItem.itemNumber,
            description: lineItem.description,
            price: lineItem.price,
            quantity: lineItem.quantity,
          })
      ),
      purchasedBy: purchaser.id,
    });
    await this.repo.save(purchaseOrder);
    return purchaseOrder.id;
  }
}
