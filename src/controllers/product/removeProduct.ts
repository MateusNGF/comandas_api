import { ProdutoRepositorio } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, Unauthorized } from "../../utils";



export class RemoveProduct implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId:string = request.header.company.id
      const productId:string = request.params.productId

      if (!await ProdutoRepositorio.remover(companyId, productId)) {
        throw new BadRequest("Não foi possivel remover, verifique se ele ainda esta cadastrado ou tente novamente.")
      }

      return Messenger.success({})
    } catch (error) {
      return Messenger.error(error)
    }
  }
}