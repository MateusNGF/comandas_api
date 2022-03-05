import { clienteDTO } from "./cliente.dto"
import { Evento } from "./evento.dto"

/**
 *  Company DTO é a entidade principal
 */
export type Company = {
  id?: string | number,
  responsavel?: string,
  empresa?: string,
  cnpj?: string,
  email?: string,
  telefone?: string,
  clientes?: Array<clienteDTO>,
  eventos?: Array<Evento>
  create_at?: Date,
  update_at?: Date,
}