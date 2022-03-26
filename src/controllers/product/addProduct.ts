import { Empresa, ProdutoEstoque } from "../../entities";
import { CompanyRepository, ProdutoRepositorio } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, Unauthorized } from "../../utils";



export class AddProduct implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId = request.header.company.id

      ObjectManager.hasKeys(["nome", "marca", "preco", "estoque", "categoria"], request.body)

      const Empresa:Empresa = await CompanyRepository.findCompanyById(companyId)
      if (!Empresa) { throw new Unauthorized("Operação recusada.")}

      const produtoEstoque: ProdutoEstoque = new ProdutoEstoque(request.body)

      if (Empresa.produtos && Empresa.produtos.find(produtoCadastrado => {
        return produtoCadastrado.nome === produtoEstoque.nome && produtoCadastrado.marca && produtoCadastrado.marca === produtoEstoque.marca
      })) {
        throw new BadRequest(`Você já possui esse o produto ${produtoEstoque.nome} da marca ${produtoEstoque.marca} cadastrado.`)
      }

      if (!await ProdutoRepositorio.adicionar(Empresa.id, produtoEstoque)) {
        throw new BadRequest(`Não foi possivel cadastrar o produto ${produtoEstoque.nome}, tente de novo.`)
      }

      return Messenger.success(produtoEstoque)
    } catch (error) {
      return Messenger.error(error)
    }
  }
}