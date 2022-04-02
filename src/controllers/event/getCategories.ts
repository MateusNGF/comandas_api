import { EventRepository } from "../../repositorys/eventRepository";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class getCategories implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const companyId: string = request.header.company.id
      const categories = await EventRepository.getCategories(companyId)
      
      return Messenger.success(categories)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}