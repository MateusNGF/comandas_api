import { Comanda, Evento } from "../../entities";
import { EventRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";


export class CreateCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      const eventId = request.params.eventId

      ObjectManager.hasKeys(["numero", "portador"], request.body)

      const evento: Evento = new Evento(await EventRepository.findById(eventId, companyId))
      if (!evento) throw new BadRequest(textSchema.ptbr.controllers.event.eventNotFound)
      
      let novaComanda = new Comanda(request.body)

      await evento.adicionarComanda(novaComanda)

      return Messenger.success(evento.comandas)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}