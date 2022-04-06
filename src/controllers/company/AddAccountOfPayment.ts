import { IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import BankAccountValidator from "br-bank-account-validator";

export class AddAccountOfPayment implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId: string = request.header.company.id
      
      ObjectManager.hasKeys(["bankNumber", "agencyNumber", "agencyCheckNumber", "accountNumber", "accountCheckNumber"], request.body)

     
      console.log(BankAccountValidator.validate(request.body));
      
      return Messenger.success({})
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}