import { EventRepository } from "../../repositorys/eventRepository";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class getEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      
      const eventId: string = request.params.eventId
      const companyId: string = request.header.company.id

      const evento = await EventRepository.getEvent(eventId, companyId)

      return Messenger.success(evento)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}