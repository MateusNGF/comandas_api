import { Comanda } from "../entities";

export class CommandService {
  static isUsed(comandas :Array<Comanda>, comanda : Comanda) {
    return (comandas && comandas.find(comand => comand.numero === comanda.numero)) ? true : false
  }
}