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
  async fetchNextPONumber() {
    if (this.purchaseOrders.length === 0) {
      return new PONumber("syn-000001");
    }
    const [lastPO] = this.purchaseOrders.sort(byPONumber);
    return lastPO.number?.increment() ?? new PONumber("syn-000001");
  }
}
