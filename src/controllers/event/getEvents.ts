import { EventRepository } from "../../repositorys/eventRepository";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class getEvents implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      
      return Messenger.success(await EventRepository.getEvents(companyId))
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}

export class groupEventsByCategory implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id

      return Messenger.success(await EventRepository.groupEventosByCategory(companyId))
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}