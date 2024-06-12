import { UUID } from "../../utilities/uuid";
import { PONumber } from "./PONumber.value-object";
import { PurchaseOrder } from "./PurchaseOrder.entity";

export interface IPORepository {
  save: (po: PurchaseOrder) => Promise<void>;
  fetch: (id: UUID) => Promise<PurchaseOrder | null>;
  fetchNextPONumber: () => Promise<PONumber>;
}
