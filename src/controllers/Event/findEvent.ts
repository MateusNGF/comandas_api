import { EventRepositry } from "../../repositorys/eventRepositoriy"
import { BadRequestError, IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils"
import text_schema from "../../utils/aplication_config/textSchema";
const texts_controller = text_schema.ptbr.controllers.event.getEventByNomeOrId


export class findEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const { eventNome, eventId } = request.body
      let cursor;

      if (!eventNome && !eventId) throw new BadRequestError(texts_controller.missingParams)

      if (eventNome) {cursor = await EventRepositry.findByNome(eventNome, request.header.company.id)}
      else { cursor = await EventRepositry.findById(eventId, request.header.company.id) }

      return Messenger.success(cursor)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}