import { Produto } from "../../entities";
import { CompanyRepository, ProductRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, Unauthorized } from "../../utils";



export class AddProduct implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id

      ObjectManager.hasKeys(["nome", "marca", "preco", "estoque", "categoria"], request.body)

      const company = await CompanyRepository.findCompanyById(companyId)
      if (!company) { throw new Unauthorized("Operação recusada.")}

      const produto = new Produto(request.body)

      if (company.produtos && company.produtos.find(produtoI => {
        return produtoI.nome === produto.nome && produtoI.marca && produtoI.marca === produto.marca
      })) {
        throw new BadRequest(`Você já possui esse o produto cadastrado.`)
      }

      if (!ProductRepository.add(company.id, produto)) {
        throw new BadRequest("Não foi possivel cadastrar, tente novamente.")
      }

      return Messenger.success(produto)
    } catch (error) {
      return Messenger.error(error)
    }
  }
}