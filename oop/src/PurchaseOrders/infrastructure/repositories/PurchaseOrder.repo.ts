import { UUID } from "../../../utilities/uuid";
import { IPORepository } from "../../domain/PurchaseOrder.repo-interface";
import { PurchaseOrder } from "../../domain/PurchaseOrder.entity";

export class PORepository implements IPORepository {
  purchaseOrders: PurchaseOrder[] = [];
  async save(po: PurchaseOrder) {
    const existingPO = this.purchaseOrders.find((p) => p.id === po.id);
    this.purchaseOrders = existingPO
      ? [...this.purchaseOrders.filter((p) => p.id !== po.id), po]
      : [...this.purchaseOrders, po];
    return undefined;
  }
  async fetch(id: UUID) {
    const po = this.purchaseOrders.find((p) => p.id === id);
    return po || null;
  }
}
