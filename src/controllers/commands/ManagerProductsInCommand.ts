import { Comanda, Empresa, Evento, ProdutoComprado, ProdutoEstoque } from "../../entities";
import { CommandsRepository, CompanyRepository, ProductRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, Unauthorized } from "../../utils";
import textSchema from "../../utils/configurations/textSchema";
const textsConfiguration = textSchema.ptbr.controllers.command


export class ManagerProductInCommand implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      const companyId = request.header.company.id
      const eventId = request.params.eventId
      const comandaId = request.params.commandId
      const action = request.params.action
      const productId = request.params.productId
      
      ObjectManager.hasKeys(["quantidade"], request.body)

      const quantidadeDeProdutos:number = Number(request.body.quantidade)

      let empresa: Empresa = new Empresa(await CompanyRepository.getCompany(companyId))
      if (!empresa) throw new BadRequest("Empresa não encontrada.")
      
      let evento: Evento = new Evento(empresa.pegarEvento(eventId))
      let comanda: Comanda = new Comanda(evento.pegarComanda(comandaId))
      let produtoEstoque = new ProdutoEstoque(empresa.pegarProduto(productId))
      

      if (action == "adicionar") {
        
        produtoEstoque.vender(comanda, quantidadeDeProdutos)

        if (comanda.saldo > evento.maximo_saldo) {
          throw new BadRequest(`O limite para o saldo desse evento é ${evento.pegarMaximoSaldo()}, sua comanda possui ${comanda.pegarSaldo()}`)
        } 

      } else if (action == "remover") {

        produtoEstoque.voltarProduto(comanda, quantidadeDeProdutos)
        
      } else {
        throw new BadRequest(textsConfiguration.undefinedError)
      }

      // ATUALIZAR TODOS OS DADOS
      // estoque do produto (Produto)
      if (!await ProductRepository.atualizar(companyId, produtoEstoque))
        throw new BadRequest(`Ocorreu um erro ao atualizar o estoque do produto "${produtoEstoque.nome}".`)
      
      // comanda do evento (Comanda)
      if (!await CommandsRepository.atualizar(companyId, eventId, comanda))
        throw new BadRequest(`Ocorreu um erro ao atualizar a comanda ${comanda.numero}. Tente Novamente.`)
      
      return Messenger.success(comanda)
    } catch (erro) {
      console.log(erro)
      return Messenger.error(erro)
    }
  }
}