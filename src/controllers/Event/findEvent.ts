import { EventRepositry } from "../../repositorys/eventRepositoriy"
import { BadRequest, IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils"
import text_schema from '../../utils/configurations/textSchema'
const texts_controller = text_schema.ptbr.controllers.event.findEvent


export class findEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const { eventNome, eventId } = request.body
      const companyId = request.header.company.id

      let cursor = undefined;

      if (!eventNome && !eventId) throw new BadRequest(texts_controller.missingParams)

      if (eventNome) {
        cursor = await EventRepositry.findByNome(eventNome, companyId)
      }
      
      if ((!cursor || cursor.length < 1) && eventId) {
        cursor = await EventRepositry.findById(eventId, companyId) 
      }
      
      return Messenger.success(cursor)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}