import { ObjectId } from "mongodb";
import { Evento } from "../../entities";
import { EventRepositry } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import text_schema from "../../utils/configurations/textSchema";
const textConfigs = text_schema.ptbr.controllers.event.create

export class createEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const realizador = request.header.company.id

      ObjectManager.hasKeys(["nome", "data_fim"], request.body)
      
      const evento: Evento = new Evento(request.body)

      if (!evento.data_inicio) {
        evento.data_inicio = new Date().toISOString()
      }

      evento.realizador = realizador
      evento.criado_em = new Date().toISOString()
      evento.arquivado = false

      const databaseResult = await EventRepositry.create(evento)
      if (!databaseResult.insertedId) {throw new BadRequest(textConfigs.insertFailed)}
      
      return Messenger.success({ id: databaseResult.insertedId })
    } catch (erro) {
      return Messenger.error(erro)
    }
  } 
}