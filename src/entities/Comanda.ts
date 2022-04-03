import { formatToBRL } from 'brazilian-values'
import { BadRequest, gerarID } from "../utils"
import { Cliente } from "./Cliente"
import { ProdutoComprado, ProdutoEstoque as produtoEstoque } from "./Produto"

export class Comanda {

  constructor(comanda: Comanda) {
    Object.assign(this, comanda)
    this.valid()
  }

  id?: string
  numero: number
  saldo?: number = 0
  visitante?: boolean = true
  portador: Cliente.visitante_completo 
  pago?: boolean = false
  produtos?: Array<ProdutoComprado> = []
  criado_em?: string = new Date().toISOString()
  
  valid() {}
  
  pagar() {
    this.verificarSeFoiPaga()
    if (!(this.produtos && this.saldo)) {
      throw new BadRequest("Essa comanda não possui saldo a ser pago.")
    }
    this.pago = true
  }

  pegarProduto(productId: string) {
    if (!this.produtos) throw new BadRequest("Nenhum produto comprado.")
    return this.produtos?.find(p => p.id === productId)
  }

  adicionarProduto(produtoEstoque: produtoEstoque, quantidadeDeProdutos: number) {
    this.verificarSeFoiPaga()
    this.saldo += (produtoEstoque.preco * quantidadeDeProdutos)
    let produtoIgual: ProdutoComprado = this.pegarProduto(produtoEstoque.id)

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

    let produtoComprado: ProdutoComprado = this.pegarProduto(productId)
    
    if (!produtoComprado)
      throw new BadRequest("Esse produto não foi comprado.")

    if (produtoComprado.quantidade < quantidadeDeProdutos)
      throw new BadRequest(`Você possui apenas ${produtoComprado.quantidade}x ${produtoComprado.nome} comprados.`)
      
    produtoComprado.quantidade -= quantidadeDeProdutos
    this.saldo -= (produtoComprado.preco * quantidadeDeProdutos)
      
    if (this.saldo < 0) {throw new BadRequest("Algo deu errado. Saldo fica negativo ao remover esse produto.")}
    
    if (!produtoComprado.quantidade) {
      let index: number = this.produtos.indexOf(produtoComprado)
      this.produtos.splice(index, 1)
    }

    return true
  }



  verificarSeFoiPaga() {
    if (this.pago) {
      throw new BadRequest(`A comanda Nº${this.numero} com ${this.pegarSaldo()} já foi paga.`)
    }
    return false
  }

  /**
   * Formata o valor passado para BRL 
   * @param valor numero de entrada
   * @example 16556 => 'R$ 1.655,6'
   * @returns string
   */
  formatarDinheiro(valor: number) {
    return formatToBRL(valor)
  }

  /**
   * Retorna o saldo formatado em BRL
   * @example 1450 => 'R$ 1.450,00'
   * @returns string
   */
  pegarSaldo() {
    return this.formatarDinheiro(this.saldo)
  }
}