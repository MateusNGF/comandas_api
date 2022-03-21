import { MissingParam } from "../utils/errors/custom/MissingParam"

export class Produto {
  
  constructor(produto: Produto) {
    Object.assign(this, produto)
    this.validar()
  }

  id?: string
  nome: string
  marca?: string
  preco: number
  categoria: string | Produto.Categoria // id ou o categoria completa
  
  validar?() {
    for (const key in this) { if (!this[key]) throw new MissingParam(key) }
  }
  
}

export namespace Produto {
  export class Categoria {
    id: string
    nome: string
  }
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
}




