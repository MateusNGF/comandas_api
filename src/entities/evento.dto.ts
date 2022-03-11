import { ObjectId } from "mongodb"
import { props } from "../utils/configurations"
import textSchema from "../utils/configurations/textSchema"
import { InvalidFormat } from "../utils/errors/custom/InvalidFormat"
import { MissingParam } from "../utils/errors/custom/MissingParam"
import { Comanda } from "./comanda.dto"

export class Evento {

  constructor(evento: Evento) {
    Object.assign(this, evento)
    this.valid()
  }

  id?: string
  nome: string
  realizador: string
  data_inicio: string
  data_fim: string
  comandas?: Array<Comanda>
  criado_em?: string
  arquivado?: boolean

  valid() {
    for (const key in this) {if (!this[key]) throw new MissingParam(key)}
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
}