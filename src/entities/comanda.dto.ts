import { ObjectId } from "mongodb"
import { MissingParam } from "../utils/errors/custom/MissingParam"
import { Cliente } from "./cliente.dto"

export class Comanda {
  constructor(comanda: Comanda) {
    Object.assign(this, comanda)
    this.valid()
  }

  id?: string
  evento: string
  numero: Number
  saldo?: Number
  is_visitor?: boolean
  portador: Cliente | Cliente.visitante_simples | Cliente.visitante_completo | string
  status?: boolean
  produtos?: any
  criado_em?: string
  
  valid() {
    for (const key in this) { if (!this[key]) throw new MissingParam(key) }
  }
}