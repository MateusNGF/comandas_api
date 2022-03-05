import { comandaDTO } from "./comanda.dto"

export type Evento = {
  id?: string,
  nome: string,
  realizador?: string,
  data_inicio: Date,
  data_fim: Date,
  comandas?: Array<comandaDTO>
}