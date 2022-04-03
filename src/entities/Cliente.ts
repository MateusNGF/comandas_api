import { Comanda } from "./Comanda"

export type Cliente = {
  id?: string,
  empresa?: string | number,
  nome?: string,
  email?: string,
  cpf?: string,
  endereco?: string
  comandas?: Array<Comanda>
}

export namespace Cliente {
  export type visitante_completo = {
    nome?: string,
    cpf: string,
    email?: string
    telefone?: string
  }
}