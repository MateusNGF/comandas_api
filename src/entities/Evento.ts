import { formatToBRL } from "brazilian-values"
import { ObjectId } from "mongodb"
import { CommandsRepository } from "../repositorys"
import { BadRequest, DatabaseError } from "../utils"
import { props } from "../utils/configurations"
import textSchema from "../utils/configurations/textSchema"
import { InvalidFormat } from "../utils/errors/custom/InvalidFormat"
import { MissingParam } from "../utils/errors/custom/MissingParam"
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

  async atualizarComanda(comanda: Comanda) : Promise<Boolean> {
    this.comandas[this.comandas.indexOf(this.comandas.find(c => c.id === comanda.id))] = comanda
    if (await CommandsRepository.atualizar(this.realizador, this.id, comanda)) {return true}
    throw new DatabaseError(null, "Não foi possivel atualizar a comanda " + comanda.numero)
  }

  formatarDinheiro(valor?: number) {
    if (valor) return formatToBRL(valor)
  }

  pegarMaximoSaldo() {
    return this.formatarDinheiro(this.maximo_saldo)
  }
}