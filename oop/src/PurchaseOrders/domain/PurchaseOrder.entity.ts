import { DomainInvariantViolation } from "../../utilities/error/DomainInvariantViolation";
import { createUuid, UUID } from "../../utilities/uuid";
import { PONumber } from "./PONumber.value-object";
import { PurchaseOrderLineItem } from "./PurchaseOrderLineItem.entity";

type PurchaseOrderProps = {
  id?: UUID;
  number?: PONumber;
  lineItems?: PurchaseOrderLineItem[];
  purchasedBy?: UUID | null;
};

export class PurchaseOrder {
  private _id: UUID;
  private _number?: PONumber;
  private _lineItems: PurchaseOrderLineItem[] = [];
  private _purchasedBy?: UUID | null;
  constructor({ id, purchasedBy, number, lineItems }: PurchaseOrderProps = {}) {
    this._id = id ?? createUuid();
    this._number = number;
    this._lineItems = lineItems ?? [];
    this._purchasedBy = purchasedBy ?? null;
  }

  submit(num: PONumber) {
    if (this._number)
      throw new DomainInvariantViolation(
        "Submitted POs can't be assigned a new PO Number"
      );
    this._number = num;
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

  get purchasedBy() {
    return this._purchasedBy;
  }

  get status() {
    return this._number ? "pending approval" : "draft";
  }
}
