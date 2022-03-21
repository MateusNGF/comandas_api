import { MissingParam } from "../utils/errors/custom/MissingParam"
import { Cliente } from "./Cliente"
import { Produto } from "./Produto"

export class Comanda {

  constructor(comanda: Comanda) {
    Object.assign(this, comanda)
    this.valid()
  }

  id?: string
  numero: number
  saldo?: number
  visitante?: boolean
  portador: Cliente | Cliente.visitante_simples | Cliente.visitante_completo
  pago?: boolean
  produtos?: Array<Produto>
  criado_em?: string
  
  valid() {
    for (const key in this) {
      if (!this[key]) throw new MissingParam(key)
    }
  }
  
}