import { EventRepositry } from "../../repositorys";
import { BadRequest, IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";




export class ArquivedEvent implements IController{
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id
      const eventId = request.params.eventId
      const setStatus = request.params.status

      if (setStatus == "true"){
        if (!await EventRepositry.archive(eventId, companyId)) {
          throw new BadRequest(textSchema.ptbr.controllers.event.archiveFailed)
        }
      }

      if (setStatus == "false") {
        if (!await EventRepositry.unarchive(eventId, companyId)) {
          throw new BadRequest(textSchema.ptbr.controllers.event.unarchiveFailed)
        }
      }
      
      return Messenger.success({})
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}