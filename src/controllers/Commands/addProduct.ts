import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";


export class addProduct implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const companyId = request.header.company.id
      const eventId = request.params.eventId
      
      return Messenger.success({})
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}