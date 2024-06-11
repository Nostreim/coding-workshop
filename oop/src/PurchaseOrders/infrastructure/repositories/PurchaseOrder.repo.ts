import { UUID } from "../../../utilities/uuid";
import { IPORepository } from "../../domain/PurchaseOrder.repo-interface";
import { PurchaseOrder } from "../../domain/PurchaseOrder.entity";

export class PORepository implements IPORepository {
  purchaseOrders: PurchaseOrder[] = [];
  async save(po: PurchaseOrder) {
    this.purchaseOrders.push(po);
    return undefined;
  }
  async fetch(id: UUID) {
    const po = this.purchaseOrders.find((p) => p.id === id);
    return po || null;
  }
}
