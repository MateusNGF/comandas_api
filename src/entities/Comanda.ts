import { CommandsRepository } from "../repositorys"
import { formatToBRL } from 'brazilian-values'
import { BadRequest } from "../utils"
import { MissingParam } from "../utils/errors/custom/MissingParam"
import { Cliente } from "./Cliente"
import { Produto, ProdutoComprado, ProdutoEstoque as produtoEstoque } from "./Produto"

export class Comanda {

  constructor(comanda: Comanda) {
    Object.assign(this, comanda)
    this.valid()
  }

  id?: string
  numero: number
  saldo?: number
  visitante?: boolean
  portador: Cliente | Cliente.visitante_simples | Cliente.visitante_completo | string
  pago?: boolean
  produtos?: Array<ProdutoComprado>
  criado_em?: string
  
  valid() {}
  
  pagar() {
    this.verificarSeFoiPaga()
    if (!(this.produtos && this.saldo)) { throw new BadRequest("Essa comanda não possui saldo a ser pago.") }
    this.pago = true
  }

  adicionarProduto(produtoEstoque: produtoEstoque, quantidadeDeProdutos: number) {
    this.verificarSeFoiPaga()
    this.saldo += produtoEstoque.preco * quantidadeDeProdutos
    let produtoIgual: ProdutoComprado = this.produtos?.find(p => p.id === produtoEstoque.id)

    if (produtoIgual) {
      let index = this.produtos.indexOf(produtoIgual)
      this.produtos[index].quantidade += quantidadeDeProdutos
    } else {
      let novoProduto: ProdutoComprado = new ProdutoComprado({
        id: produtoEstoque.id,
        nome: produtoEstoque.nome,
        quantidade: quantidadeDeProdutos,
        categoria: produtoEstoque.categoria,
        preco: produtoEstoque.preco,
        marca: produtoEstoque.marca
      })
      this.produtos?.push(novoProduto)
    }
    return true
  }

  removerProduto(productId: string, quantidadeDeProdutos: number) {
    this.verificarSeFoiPaga()

    let produto: ProdutoComprado = this.pegarProduto(productId)

    if (produto.quantidade < quantidadeDeProdutos)
      throw new BadRequest(`Você possui apenas ${produto.quantidade}x ${produto.nome} comprados.`)
      
    produto.quantidade -= quantidadeDeProdutos
    this.saldo -= (produto.preco * quantidadeDeProdutos)
      
    if (this.saldo < 0) {
      throw new BadRequest("Algo deu errado. Saldo fica negativo ao remover esse produto.")
    }

    let index: number = this.produtos.indexOf(produto)
    return (this.produtos.splice(index, 1)) ? true : false
  }

  pegarProduto(productId: string) {
    if (!this.produtos) throw new BadRequest("Nenhum produto comprado.")
    let produto: ProdutoComprado = this.produtos?.find(p => p.id === productId)
    if (!produto) throw new BadRequest("Esse produto não foi comprado.")
    return produto
  }


  formatarDinheiro(valor: number) {
    return formatToBRL(valor)
  }

  verificarSeFoiPaga() {
    if (this.pago) {
      throw new BadRequest(`A comanda Nº${this.numero} com ${this.pegarSaldo()} já foi paga.`)
    }
    return false
  }

  pegarSaldo() {
    return this.formatarDinheiro(this.saldo)
  }
}