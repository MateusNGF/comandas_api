import { isCPF, isPhone } from "brazilian-values"
import { BadRequest, Email, InvalidFormat } from "../utils"
import { Comanda } from "./Comanda"

export class Cliente {
  id?: string
  empresa?: string | number
  nome?: string
  email?: string
  cpf?: string
  endereco?: string
  comandas?: Array<Comanda>
}

export class Visitante {
  constructor(visitante: Visitante) {
    Object.assign(this, visitante)
    this.valid()
  }
  id?:string
  nome?: string
  cpf: string
  email?: string
  telefone?: string


  private valid() {
    if (!isCPF(this.cpf)) { throw new InvalidFormat('CPF') }
    if (this.email) { Email.isValid(this.email) }
    if (this.telefone && !isPhone(this.telefone)) { throw new InvalidFormat("Telefone") }
    for (let key in this) {if (!this[key]) delete this[key]}
  }




}