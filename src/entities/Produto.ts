import { BadRequest, gerarID } from "../utils"
import { MissingParam } from "../utils/errors/custom/MissingParam"
import { Comanda } from "./Comanda"

export class Produto {
  
  constructor(produto: Produto) {
    Object.assign(this, produto)
  }
  
  id?: string
  nome: string
  marca?: string
  preco: number
  categoria: string
  foto?: string 
  
}


export class ProdutoComprado extends Produto {
  constructor(produto: ProdutoComprado) {
    super(produto)
  }
  quantidade?: number
}

export class ProdutoEstoque extends Produto {
  constructor(produto: ProdutoEstoque) {
    super(produto)
  }
  estoque?: number

  vender(comanda: Comanda, quantidadeDeProdutos:number) {
    if (this.estoque < quantidadeDeProdutos)
      throw new BadRequest(`Há apenas ${this.estoque}x ${this.nome} em estoque.`)
    
    this.estoque -= quantidadeDeProdutos
    comanda.adicionarProduto(this, quantidadeDeProdutos)
    return true
  }

  voltarProduto(comanda: Comanda, quantidadeDeProdutos: number) {
    comanda.removerProduto(this.id, quantidadeDeProdutos)
    this.estoque += quantidadeDeProdutos
    return true
  }
}




