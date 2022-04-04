import { isCPF, isPhone } from "brazilian-values"
import { BadRequest, Email, InvalidFormat, ObjectManager } from "../utils"
import { Comanda } from "./Comanda"



export class Visitante {
  constructor(visitante: Visitante) {
    ObjectManager.assing(this, visitante)
    this.valid()
  }
  id?: string = undefined
  nome?: string = undefined
  cpf: string = undefined
  email?: string = undefined
  telefone?: string = undefined


  valid() {
    if (!isCPF(this.cpf)) { throw new InvalidFormat('CPF') }
    if (this.email) { Email.isValid(this.email) }
    if (this.telefone && !isPhone(this.telefone)) { throw new InvalidFormat("Telefone") }
    for (let key in this) { if (!this[key]) delete this[key] }
  }
}


export class Cliente extends Visitante {

  constructor(cliente : Cliente) {
    super(cliente)
  }

  empresa?: string | number = undefined
  endereco?: string = undefined
  comandas?: Array<Comanda> = undefined
}

