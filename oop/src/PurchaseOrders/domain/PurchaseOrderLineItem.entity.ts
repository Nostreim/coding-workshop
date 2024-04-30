import { UUID, createUuid } from "../../utilities/uuid";

export class PurchaseOrderLineItem {
  private _id: UUID;
  private _purchaseOrderId: UUID;
  private _itemNumber: string;
  private _description: string;
  private _price: number;
  private _quantity: number;
  constructor({
    id,
    purchaseOrderId,
    itemNumber,
    description,
    price,
    quantity,
  }: {
    id?: UUID;
    purchaseOrderId: UUID;
    itemNumber: string;
    description: string;
    price: number;
    quantity: number;
  }) {
    this._id = id ?? createUuid();
    this._purchaseOrderId = purchaseOrderId;
    this._itemNumber = itemNumber;
    this._description = description;
    this._price = price;
    this._quantity = quantity;
  }

  get id() {
    return this._id;
  }

  get purchaseOrderId() {
    return this._purchaseOrderId;
  }

  get itemNumber() {
    return this._itemNumber;
  }

  get description() {
    return this._description;
  }

  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }
}
