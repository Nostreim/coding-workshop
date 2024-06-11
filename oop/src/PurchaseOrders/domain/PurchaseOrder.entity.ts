import { createUuid, UUID } from "../../utilities/uuid";
import { PONumber, PrefixedNumber } from "./PONumber.value-object";
import { PurchaseOrderLineItem } from "./PurchaseOrderLineItem.entity";

type PurchaseOrderProps = {
  id?: UUID;
  poNumber?: PrefixedNumber;
  lineItems?: PurchaseOrderLineItem[];
};

export class PurchaseOrder {
  private _id: UUID;
  private _number: PONumber;
  private _lineItems: PurchaseOrderLineItem[] = [];
  constructor({ id, poNumber, lineItems }: PurchaseOrderProps = {}) {
    this._id = id ?? createUuid();
    this._number = new PONumber(poNumber ?? (`syn-000001` as PrefixedNumber));
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
