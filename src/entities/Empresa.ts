import { BadRequest, Email } from "../utils"
import { MissingParam } from "../utils/errors/custom/MissingParam"
import * as Validator from 'brazilian-values'
import { Cliente, Produto, Evento } from "./"
import { InvalidFormat } from "../utils/errors/custom/InvalidFormat"
import { props } from "../utils/configurations"
import textSchema from "../utils/configurations/textSchema"
import { ProdutoEstoque } from "./Produto"

export class Empresa {
  constructor(empresa : Empresa) {
    Object.assign(this, empresa)
    this.validar()
  }

  id?: string
  responsavel?: string
  nome: string
  cnpj?: string
  email: string
  senha?: string
  telefone?: string
  clientes?: Array<Cliente>
  eventos?: Array<Evento>
  produtos?: Array<ProdutoEstoque>
  criado_em?: string
  atualizado_em?: string

  validar() {
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

  pegarEvento(eventId: string): Evento {
    if (!this.eventos) throw new BadRequest(`${this.nome} não realizou nenhum evento ainda.`)
    let Evento: Evento = this.eventos.find(e => e.id === eventId)
    if (!Evento) throw new BadRequest("O evento não foi encontrado.")
    else return Evento
  }

  pegarProduto(productId: string) {
    if (!this.produtos) throw new BadRequest("Nenhum produto cadastrado.")
    let produto: ProdutoEstoque = this.produtos?.find(p => p.id === productId)
    if (!produto) throw new BadRequest("Esse produto não existe no seu estoque.")
    return produto
  }


}