import { Produto } from "../../entities";
import { CompanyRepository, ProductRepository } from "../../repositorys";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";


export class ListProducts implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId: string = request.header.company.id
      
      const produtos : Array<Produto> = await ProductRepository.list(companyId)

      return Messenger.success(produtos)
    } catch (error) {
      return Messenger.error(error)
    }
  }
}