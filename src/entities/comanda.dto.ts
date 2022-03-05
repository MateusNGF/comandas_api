import { clienteDTO } from "./cliente.dto"

export type comandaDTO = {
  id?: string,
  evento?: string,
  numero?: string,
  saldo?: Number,
  is_visitor?: boolean
  portador?: clienteDTO | clienteDTO.visitante_simples | clienteDTO.visitante_completo | string,
  status?: boolean
}