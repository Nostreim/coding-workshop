import { UUID } from "../../../utilities/uuid";

export class CreatePOLineItemDTO {
  id: UUID;
  itemNumber: string;
  description: string;
  price: number;
  quantity: number;
}

export class CreatePODTO {
  id: UUID;
  lineItems: CreatePOLineItemDTO[];
}
