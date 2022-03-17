import { Comanda, Evento } from "../../entities";
import { CommandsRepository, EventRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";


export class CreateCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      const eventId = request.params.eventId

      ObjectManager.hasKeys(["numero", "portador"], request.body)

      const event:Evento = await EventRepository.findById(eventId, companyId)
      if (!event) throw new BadRequest(textSchema.ptbr.controllers.event.eventNotFound)
      
      let comanda = new Comanda(request.body)

      if (await CommandsRepository.isUsed(comanda.numero, eventId)) {
        throw new BadRequest(textSchema.ptbr.controllers.command.inUse)
      }
      
      comanda.is_visitor = true
      comanda.saldo = 0
      comanda.evento = eventId
      comanda.criado_em = new Date().toISOString()
      comanda.pago = false
      
      const databaseResult = await CommandsRepository.create(comanda)

      if (databaseResult.insertedId) { return Messenger.success({}) }
      
      throw new BadRequest(textSchema.ptbr.controllers.command.insertFailed)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}