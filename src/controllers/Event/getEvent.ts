import { EventRepositry } from "../../repositorys/eventRepositoriy";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class getEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      
      const eventId: string = request.params.eventId
      const companyId: string = request.header.company.id

      return Messenger.success(await EventRepositry.getEvent(eventId, companyId))
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}