import { Evento } from "../../entities";
import { Comanda } from "../../entities/comanda.dto";
import { EventRepository } from "../../repositorys";
import { CommandsRepository } from "../../repositorys/commadRepository";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, UnauthorizedError as Unauthorized } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";
const textsConfiguration = textSchema.ptbr.controllers.command


export class ManagerProductInCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const companyId = request.header.company.id
      const eventId = request.params.eventId
      const comandaId = request.params.commandId
      const action = request.params.action
      
      ObjectManager.hasKeys(["value"], request.body)

      let comanda: Comanda = await CommandsRepository.findCommandByEvent(comandaId, eventId)
      let evento: Evento = await EventRepository.findById(comanda.evento, companyId)

      if (!comanda) throw new BadRequest(textsConfiguration.NotFound)
      if (!evento) throw new Unauthorized(textsConfiguration.operationRefused)
      
      if (action == "adicionar") {
        const setBalance = comanda.saldo + new Number(request.body.value).valueOf()

        if (setBalance > evento.maximo_saldo) {
          throw new BadRequest("Limite do Saldo atingido. Pague o saldo existente.")
        } else {
          comanda.saldo = setBalance
        }

      } else if (action == "remover") {
        const setBalance = comanda.saldo - new Number(request.body.value).valueOf()
        if (setBalance > 0) {comanda.saldo = setBalance
        } else { throw new BadRequest(textsConfiguration.negativeBalance) }
        
      } else {throw new BadRequest(textsConfiguration.operationRefused)}

      console.log(evento)
      if (CommandsRepository.updateBalance(comanda)) {
        return Messenger.success(comanda)
      }
      
      throw new BadRequest(textsConfiguration.undefinedError)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}