import { Email } from "../utils"
import { MissingParam } from "../utils/errors/custom/MissingParam"
import * as Validator from 'brazilian-values'
import { Cliente } from "./cliente.dto"
import { Evento } from "./evento.dto"
import { InvalidFormat } from "../utils/errors/custom/InvalidFormat"
import { props } from "../utils/configurations"
import textSchema from "../utils/configurations/textSchema"
import { ObjectId } from "mongodb"

export class Company {
  constructor(company : Company) {
    Object.assign(this, company)
    this.valid()
  }

  id?: string
  responsavel?: string
  empresa: string
  cnpj?: string
  email: string
  senha?: string
  telefone?: string
  clientes?: Array<Cliente>
  eventos?: Array<Evento>
  criado_em?: string
  atualizado_em?: string

  valid() {
    for (const key in this) { if (!this[key]) throw new MissingParam(key) }
    for (const key in this) {
      if (props.entities.company[key.toString()]) {
        if (this[key.toString()].length < props.entities.company[key.toString()].text.min) {
          throw new InvalidFormat(key, textSchema.ptbr.controllers.company.validation.minLenght(key.toString())) 
        } else if (this[key.toString()].length > props.entities.company[key.toString()].text.max) {
          throw new InvalidFormat(key, textSchema.ptbr.controllers.company.validation.maxLenght(key.toString())) 
        }
      }
    }

    Email.isValid(this.email)
    if (!Validator.isCNPJ(this.cnpj)) throw new InvalidFormat('CNPJ')
    if (!Validator.isPhone(this.telefone)) throw new InvalidFormat("Telefone")
    return true
  }
}