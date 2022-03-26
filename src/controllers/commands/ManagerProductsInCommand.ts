import { Comanda, Empresa, Evento, ProdutoComprado, ProdutoEstoque } from "../../entities";
import { CommandsRepository, CompanyRepository, ProdutoRepositorio } from "../../repositorys";
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

      // atualizar produto no estoque
      await empresa.atualizarProduto(produtoEstoque)
      // atualizar comanda do evento
      await evento.atualizarComanda(comanda)
      
      return Messenger.success(comanda)
    } catch (erro) {
      console.log(erro)
      return Messenger.error(erro)
    }
  }
}