import { EventRepositry } from "../../repositorys/eventRepositoriy";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class getEvents implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      return Messenger.success(await EventRepositry.getEvents(request.header.company.id))
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}