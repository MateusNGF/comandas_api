import { comandaDTO } from "./comanda.dto"

export type clienteDTO = {
  id?: string | number,
  empresa?: string | number,
  nome?: string,
  email?: string,
  cpf?: string,
  endereco?: string
  comandas?: Array<comandaDTO>
}


export namespace clienteDTO {
  export type visitante_simples = {
    nome?: string
  }
}

export namespace clienteDTO {
  export type visitante_completo = {
    nome?: string,
    cpf?: string,
    telefone?: string
  }
}