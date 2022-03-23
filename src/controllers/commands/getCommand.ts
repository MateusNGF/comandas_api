import { Comanda, Evento } from "../../entities";
import { CommandsRepository, EventRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class GetCommand implements IController{
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId: string = request.header.company.id,
        eventId: string = request.params.eventId,
        commandId: string = request.params.commandId;
      

      const evento: Evento = new Evento(await EventRepository.getEvent(eventId, companyId))
      if (!evento) throw new BadRequest("Evento não encontrado.")

      const comanda: Comanda = new Comanda(evento.pegarComanda(commandId))

      return Messenger.success(comanda)
    } catch (error) {
      return Messenger.error(error)
    }
  }
}