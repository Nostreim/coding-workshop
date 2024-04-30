import { createUuid, UUID } from "../../utilities/uuid";
import { PurchaseOrderLineItem } from "./PurchaseOrderLineItem.entity";

export class PurchaseOrder {
  private _id: UUID;
  private _lineItems: PurchaseOrderLineItem[] = [];
  constructor({
    id,
    lineItems,
  }: { id?: UUID; lineItems?: PurchaseOrderLineItem[] } = {}) {
    this._id = id ?? createUuid();
    this._lineItems = lineItems ?? [];
  }

  get id() {
    return this._id;
  }

  get lineItems() {
    return this._lineItems;
  }
}
