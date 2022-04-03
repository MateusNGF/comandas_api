import { Comanda, Evento } from "../../entities";
import { ClienteRepository, EventRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";


export class CreateCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      const eventId = request.params.eventId

      ObjectManager.hasKeys(["numero", "portador"], request.body)
      if (typeof request.body.portador == "object") {
        ObjectManager.hasKeys(["nome", "cpf", "email"], request.body.portador)
      } else throw new BadRequest("O portador é composto por CPF, Email e Nome")
      
      // criar uma conta no banco de dados Clientes.

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