import { Comanda, Empresa, Evento } from "../../entities";
import { CommandsRepository, CompanyRepository, EventRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, Unauthorized as Unauthorized } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";
const textsConfiguration = textSchema.ptbr.controllers.command


export class PayCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      const eventId = request.params.eventId
      const commandId = request.params.commandId

      let evento: Evento = new Evento(await EventRepository.findById(eventId, companyId))
      if(!evento) throw new BadRequest("Evento não encontrada.")
      
      let comanda: Comanda = new Comanda(evento.pegarComanda(commandId))

      comanda.pagar()
      await evento.atualizarComanda(comanda)

      return Messenger.success(comanda)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}