import { ObjectId } from "mongodb";
import { EventRepositry } from "../../repositorys/eventRepositoriy";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class getEvents implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      
      return Messenger.success(await EventRepositry.getEvents(companyId))
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}