import { Evento } from "../../entities";
import { EventRepositry } from "../../repositorys";
import { BadRequestError, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import text_schema from "../../utils/aplication_config/textSchema";
const textConfigs = text_schema.ptbr.controllers.event.create

export class createEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const realizador = request.header.company.id
      const new_event: Evento = request.body
      
      ObjectManager.hasKeys(["nome", "data_inicio", "data_fim"], new_event)

      new_event.realizador = realizador
      const newEventResult = await EventRepositry.create(new_event)
      if (!newEventResult.insertedId) {throw new BadRequestError(textConfigs.insertFailed)}
      
      return Messenger.success({ id: newEventResult.insertedId })
    } catch (erro) {
      return Messenger.error(erro)
    }
  } 
}