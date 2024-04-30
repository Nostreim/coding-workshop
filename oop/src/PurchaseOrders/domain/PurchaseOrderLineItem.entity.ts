import { UUID, createUuid } from "../../utilities/uuid";

export class PurchaseOrderLineItem {
  private _id: UUID;
  private _purchaseOrderId: UUID;
  constructor({ id, purchaseOrderId }: { id?: UUID; purchaseOrderId: UUID }) {
    this._id = id ?? createUuid();
    this._purchaseOrderId = purchaseOrderId;
  }

  get id() {
    return this._id;
  }

  get purchaseOrderId() {
    return this._purchaseOrderId;
  }
}
