import { UUID } from "../../../utilities/uuid";
import { IPORepository } from "../../domain/PurchaseOrder.repo-interface";
import { PurchaseOrder } from "../../domain/PurchaseOrder.entity";
import { PONumber } from "../../domain/PONumber.value-object";

const byPONumber = (a: PurchaseOrder, b: PurchaseOrder) => {
  return (a?.number?.digits ?? 0) > (b?.number?.digits ?? 0) ? -1 : 1;
};

export class PORepository implements IPORepository {
  purchaseOrders: PurchaseOrder[] = [];
  async save(po: PurchaseOrder) {
    this.purchaseOrders = [
      ...this.purchaseOrders.filter((p) => p.id !== po.id),
      po,
    ];
    return undefined;
  }
  async fetch(id: UUID) {
    const po = this.purchaseOrders.find((p) => p.id === id);
    return po || null;
  }
  async fetchLastPOByNumber() {
    if (this.purchaseOrders.length === 0) {
      return null;
    }
    const [lastPO] = this.purchaseOrders.sort(byPONumber);
    return lastPO;
  }
}
