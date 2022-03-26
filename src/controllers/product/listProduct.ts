import { Produto, ProdutoEstoque } from "../../entities";
import { CompanyRepository, ProdutoRepositorio } from "../../repositorys";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";


export class ListProducts implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId: string = request.header.company.id
      
      const produtosEstoque : Array<ProdutoEstoque> = await ProdutoRepositorio.list(companyId)

      return Messenger.success(produtosEstoque)
    } catch (error) {
      return Messenger.error(error)
    }
  }
}