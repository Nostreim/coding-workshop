import { createUuid, UUID } from "../../utilities/uuid";
import { PONumber } from "./PONumber.value-object";
import { PurchaseOrderLineItem } from "./PurchaseOrderLineItem.entity";

type PurchaseOrderProps = {
  id?: UUID;
  number?: PONumber;
  lineItems?: PurchaseOrderLineItem[];
};

export class PurchaseOrder {
  private _id: UUID;
  private _number?: PONumber;
  private _lineItems: PurchaseOrderLineItem[] = [];
  constructor({ id, number, lineItems }: PurchaseOrderProps = {}) {
    this._id = id ?? createUuid();
    this._number = number;
    this._lineItems = lineItems ?? [];
  }

  get number() {
    return this._number;
  }

  get id() {
    return this._id;
  }

  get lineItems() {
    return this._lineItems;
  }
}
