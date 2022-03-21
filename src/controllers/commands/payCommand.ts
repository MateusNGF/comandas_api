import { Comanda, Evento } from "../../entities";
import { CommandsRepository, EventRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, Unauthorized as Unauthorized } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";
const textsConfiguration = textSchema.ptbr.controllers.command


export class PayCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      const eventId = request.params.eventId
      const commandId = request.params.commandId

      let comanda: Comanda = await CommandsRepository.findCommandByEvent(commandId, eventId)
      if (!comanda) throw new BadRequest(textsConfiguration.NotFound)

      let evento: Evento = await EventRepository.findById("", companyId)
      if (!evento) throw new Unauthorized(textsConfiguration.operationRefused)

      if (comanda.pago && comanda.pago == true) {
        throw new BadRequest("Comanda já foi paga.")
      }

      if (Number(comanda.saldo) < 1) {
        throw new BadRequest("Essa comanda não possui saldo a ser pago.")  
      }

      if (CommandsRepository.pay(commandId, eventId)) {
        return Messenger.success({message : "Comanda Paga."})
      }

      throw new BadRequest("Algo deu errado. tente novamente.")
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}