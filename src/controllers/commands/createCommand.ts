import { Comanda, Evento } from "../../entities";
import { CommandsRepository, EventRepository } from "../../repositorys";
import { CommandService } from "../../services";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";


export class CreateCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      const eventId = request.params.eventId

      ObjectManager.hasKeys(["numero", "portador"], request.body)

      const Evento:Evento = await EventRepository.findById(eventId, companyId)
      if (!Evento) throw new BadRequest(textSchema.ptbr.controllers.event.eventNotFound)
      
      let novaComanda = new Comanda(request.body)

      if (CommandService.isUsed(Evento.comandas, novaComanda)) {
        throw new BadRequest(textSchema.ptbr.controllers.command.inUse)
      }
      
      novaComanda.visitante = true
      novaComanda.saldo = 0
      novaComanda.criado_em = new Date().toISOString()
      novaComanda.pago = false
      novaComanda.produtos = []

      Evento.comandas?.push(novaComanda)

      if (await CommandsRepository.create(Evento.id, novaComanda)) {
        return Messenger.success(Evento)
      }
      
      throw new BadRequest(textSchema.ptbr.controllers.command.insertFailed)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}