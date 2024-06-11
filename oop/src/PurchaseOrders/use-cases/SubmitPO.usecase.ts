import { UseCase } from "../../lib/UseCase.base";
import { UUID } from "../../utilities/uuid";
import { IPORepository } from "../domain/PurchaseOrder.repo-interface";

type SubmitPOProps = {
  id: UUID;
};

export class SubmitPO implements UseCase<SubmitPOProps> {
  constructor(private repo: IPORepository) {}
  async execute({ id }: SubmitPOProps) {
    // const purchaseOrder = await this.repo.get(id);
    // purchaseOrder.submit();
    // await this.repo.save(purchaseOrder);
  }
}
