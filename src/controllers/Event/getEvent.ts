import { EventRepositry } from "../../repositorys/eventRepositoriy";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class getEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const eventId: string = request.params.eventId
      return Messenger.success(await EventRepositry.getEvent(eventId, request.header.company.id))
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}