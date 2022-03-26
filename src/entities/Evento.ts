import { formatToBRL } from "brazilian-values"
import { CommandsRepository, EventRepository } from "../repositorys"
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

  id?: string;
  nome: string;
  realizador: string;
  data_inicio: string;
  data_fim: string;
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

  comandaEmUso(comandaN: number) {
    if (
      this.comandas && // se tiver comanda
      this.comandas.find(comand =>
        (comand.numero === comandaN && comand.pago == false) // e se tiver o numero igual e a comanda não for paga
      )
    ) { throw new BadRequest(textSchema.ptbr.controllers.command.inUse) }
  }

  async adicionarComanda(comanda: Comanda) {
    this.comandaEmUso(comanda.numero)
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