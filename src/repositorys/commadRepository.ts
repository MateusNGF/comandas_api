import { MongoConnector } from "../database/MongoConnector";
import { Comanda } from "../entities/Comanda";
import { gerarID } from "../utils";


let collection = 'eventos'

export class CommandsRepository {
  static async create(eventId: string, comanda: Comanda) {
    const db = (await new MongoConnector().connect()).collection(collection)
    comanda.id = gerarID("comandas")
    const dbResult = (await db.updateOne(
      { id: eventId },
      { $push: { "comandas": comanda } })
    )
    return (dbResult.modifiedCount)?true:false
  }

  static async findCommandByEvent(companyId: string, comandaId: string, eventoId: string) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    return db.findOne({ realizador: companyId, id : comandaId, evento : eventoId })
  }

  static async updateBalance(comanda: Comanda) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    return db.updateOne({id : comanda.id}, { $set : { "saldo" : comanda.saldo}})
  }

  static async pay(comandaId: string, eventId: string) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    const dbResult = await db.updateOne({ id: comandaId, evento: eventId }, { $set: { "pago": true } })
    return (dbResult.modifiedCount > 0) ? true : false
  }

  static async atualizar(companyId: string, eventId: string, command: Comanda) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    const dbResult =  await db.updateOne(
      { realizador: companyId, id: eventId, 'comandas.id': command.id },
      {
        $set: {
          'comandas.$': command
        }
      }
    )
    return (dbResult.modifiedCount)?true:false
  }

  static async remover(companyId :string, eventId: string, command : Comanda) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    const dbResult = await db.updateOne(
      { realizador: companyId, id: eventId, 'comandas.id': command.id },
      {
        $pull: {
          'comandas.$': command
        }
      }
    )
    return (dbResult.modifiedCount) ? true : false
  }
}