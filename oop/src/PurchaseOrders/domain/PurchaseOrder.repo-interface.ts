import { UUID } from "../../utilities/uuid";
import { PurchaseOrder } from "./PurchaseOrder.entity";

export interface IPORepository {
  save: (po: PurchaseOrder) => Promise<void>;
  fetch: (id: UUID) => Promise<PurchaseOrder | null>;
  fetchLastPOByNumber: () => Promise<PurchaseOrder | null>;
}
