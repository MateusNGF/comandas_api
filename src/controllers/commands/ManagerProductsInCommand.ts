import { Company, Evento, ProdutoComprado, ProdutoEstoque } from "../../entities";
import { Comanda } from "../../entities/Comanda.dto";
import { CommandsRepository, CompanyRepository, EventRepository, ProductRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse, Unauthorized as Unauthorized } from "../../utils";
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

      let Empresa: Company = await CompanyRepository.getCompany(companyId)
      if (!Empresa) throw new BadRequest("Empresa não encontrada.")

      // verifica se existe algum evento cadastrado.
      if (!(Empresa.eventos && Empresa.eventos.length)) {
        throw new Unauthorized(`${Empresa.nome} não possui nenhum evento registrador.`)
      }

      // verifica se existe esse evento.
      let Evento:Evento = Empresa.eventos.find(evento => evento.id === eventId)
      if (!Evento) {throw new BadRequest("O evento não foi encontrado")}

      // verifica se tem a comanda dentro do evento.
      let Comanda: Comanda = Evento.comandas.find(comanda => comanda.id === comandaId)
      if (!Comanda) throw new BadRequest(textsConfiguration.NotFound)
      
      // verifica se existe produtos.
      if (!(Empresa.produtos && Empresa.produtos.length)) {
        throw new BadRequest("Nenhum produto cadastrado.")
      }

      // verificar se existe o produto.
      let ProdutoEstoque: ProdutoEstoque = Empresa.produtos.find(produto => produto.id === productId)
      if (!ProdutoEstoque) { throw new BadRequest("Esse produto não foi encontrado.") }

      if (action == "adicionar") {
        // verificar se tem a quantidade no estoque necessaria para adicionar a comanda. 
        if (ProdutoEstoque.estoque < quantidadeDeProdutos) {
          throw new BadRequest("Não há produtos suficientes no estoque. Em estoque : " + ProdutoEstoque.estoque)
        } else {
          ProdutoEstoque.estoque -= quantidadeDeProdutos
        }

        // verificar se ao adicionar o produto o saldo ultrapassa o limite do evento
        let saldoAtualizado = Comanda.saldo + (ProdutoEstoque.preco * quantidadeDeProdutos)
        if (saldoAtualizado > Evento.maximo_saldo) {
          throw new BadRequest(`O limite para o saldo desse evento é ${Evento.maximo_saldo}, sua comanda possui ${Comanda.saldo}`)
        } else {
          Comanda.saldo = saldoAtualizado
          // verifica se já ouve algum compra desse produto
          let produtoComprado: ProdutoComprado = Comanda.produtos?.find(p => p.id === ProdutoEstoque.id)
          if (produtoComprado) {
            let index = Comanda.produtos.indexOf(produtoComprado)
            produtoComprado.quantidade += quantidadeDeProdutos
            Comanda.produtos[index] = produtoComprado
          } else {
            // recria a estrutura para ProdutoComprado
            let novoProduto: ProdutoComprado = new ProdutoComprado({
              id: ProdutoEstoque.id,
              nome: ProdutoEstoque.nome,
              quantidade: quantidadeDeProdutos,
              categoria: ProdutoEstoque.categoria,
              preco: ProdutoEstoque.preco,
              marca: ProdutoEstoque.marca
            })
            Comanda.produtos?.push(novoProduto)
          }
        }
      } else if (action == "remover") {

        // verificar se o produto foi comprado
        let produtoComprado: ProdutoComprado = Comanda.produtos?.find(p => p.id === productId)
        if (!produtoComprado) { throw new BadRequest("Esse produto não foi comprado.") }
        
        let saldoAtualizado: number = Comanda.saldo - (ProdutoEstoque.preco * quantidadeDeProdutos)
        
        // verificar se o saldo ao remover fica negativo
        if (saldoAtualizado < 0) {
          throw new BadRequest("Algo deu errado. Saldo fica negativo ao remover esse produto.")
        }

        let index: number = Comanda.produtos.indexOf(produtoComprado)

        // verifica se tem a quantidade necessaria para remover
        if ((produtoComprado.quantidade -= quantidadeDeProdutos) < 0) {
          throw new BadRequest(`Sua comanda possui apenas ${produtoComprado.quantidade} do produto "${produtoComprado.nome}"`)
        } else if (produtoComprado.quantidade == 0) {
          // deleta se não tiver mais produto.        
          Comanda.produtos.splice(index, 1)
        } else {
          Comanda.produtos[index] = produtoComprado
        }
        
        produtoComprado.quantidade -= quantidadeDeProdutos
        ProdutoEstoque.estoque += quantidadeDeProdutos
        Comanda.saldo = saldoAtualizado

      } else {
        throw new BadRequest(textsConfiguration.undefinedError)
      }

      // ATUALIZAR TODOS OS DADOS
      // estoque do produto (Produto)
      await ProductRepository.atualizar(companyId, ProdutoEstoque)
      // comanda do evento (Comanda)
      await CommandsRepository.atualizar(companyId, eventId, Comanda)

      console.log("Estoque => ", ProdutoEstoque)
      console.log("Comanda => ", Comanda);
      
      return Messenger.success(Comanda)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}