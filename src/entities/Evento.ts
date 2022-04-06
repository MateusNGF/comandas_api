import { formatToBRL } from "brazilian-values"
import { CommandsRepository } from "../repositorys"
import { BadRequest, DatabaseError } from "../utils"
import { props } from "../utils/configurations"
import textSchema from "../utils/configurations/textSchema"
import { InvalidFormat } from "../utils/errors/custom/InvalidFormat"
import { Comanda } from "./Comanda"

export class Evento {

  constructor(evento: Evento) {
    Object.assign(this, evento)
    this.valid()
  }

  id?: string = undefined
  nome: string = undefined
  realizador: string = undefined
  categoria: string
  data_fim: Date = undefined
  data_inicio: Date = undefined
  comandas?: Array<Comanda> = []
  criado_em?: string = new Date().toISOString()
  arquivado?: boolean = false
  maximo_saldo: number = 500

  valid() {
    for (const key in this) {
      if (props.entities.evento[key.toString()]) {
        if (this[key.toString()].length < props.entities.evento[key.toString()].text.min) {
          throw new InvalidFormat(key, textSchema.ptbr.controllers.event.validation.minLenght(key.toString()))
        } else if (this[key.toString()].length > props.entities.evento[key.toString()].text.max) {
          throw new InvalidFormat(key, textSchema.ptbr.controllers.event.validation.maxLenght(key.toString()))
        }
      }
    }
    // for (const key in this) {if(typeof this[key] == "string" && !this[key]) delete this[key] }
  }

  pegarComanda(comandaId: string) : Comanda {
    if (!this.comandas) throw new BadRequest(`O evento ${this.nome} não possui comandas ainda.`)
    let Comanda: Comanda = this.comandas.find(c => c.id === comandaId)
    if (!Comanda) throw new BadRequest("Comanda não foi encontrada.")
    else return Comanda
  }

  formatarDinheiro(valor?: number) {
    if (valor) return formatToBRL(valor)
  }

  pegarMaximoSaldo() {
    return this.formatarDinheiro(this.maximo_saldo)
  }

  comandaEmUso(comanda : Comanda) {
    if (!this.comandas) return true
    this.comandas.find(command => {
      command = new Comanda(command)
      if ((command.numero === comanda.numero && command.pago == false))
        throw new BadRequest(`A Comanda N${command.numero}º esta sendo usada, tente atribuir outra.`) 
      if ((command.portador.cpf == comanda.portador.cpf && command.pago == false))
        throw new BadRequest(`Cliente esta usando a comanda N${command.numero}º com ${command.pegarSaldo()}`)
    })
  }

  async adicionarComanda(comanda: Comanda) {
    this.comandaEmUso(comanda)
    this.comandas.push(comanda)
    if (!await CommandsRepository.create(this.id, comanda)) {
      throw new DatabaseError("Não foi possivel criar essa comanda.")
    } return true
  }

  async removerComanda(comanda: Comanda) {
    let index = this.comandas.indexOf(this.pegarComanda(comanda.id))
    this.comandas.splice(index, 1)
    if (! await CommandsRepository.remover(this.realizador, this.id, comanda)) {
      throw new DatabaseError(`Não foi possivel remover a comanda Nº${comanda.numero}`)
    } return true
  }

  async atualizarComanda(comanda: Comanda): Promise<Boolean> {
    let index = this.comandas.indexOf(this.comandas.find(c => c.id === comanda.id))
    this.comandas[index] = comanda
    if (!await CommandsRepository.atualizar(this.realizador, this.id, comanda)) {
      throw new DatabaseError("Não foi possivel atualizar a comanda Nº" + comanda.numero)
    } return true
  }
}