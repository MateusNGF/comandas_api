import { v4 as GeneratorId } from "uuid";
import { MongoConnector } from "../database/MongoConnector";
import { Comanda } from "../entities/Comanda";


let collection = 'eventos'

export class CommandsRepository {
  
  static async create(eventId: string, comanda: Comanda) {
    const db = (await new MongoConnector().connect()).collection(collection)
    comanda.id = GeneratorId()
    const dbResult = (await db.updateOne(
      { id: eventId },
      { $push: { "comandas": comanda } })
    )
    return (dbResult.modifiedCount)?true:false
  }

  static async findCommandByEvent(comandaId: string, eventoId: string) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    return db.findOne({ id : comandaId, evento : eventoId })
  }

  static async updateBalance(comanda: Comanda) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    return db.updateOne({id : comanda.id}, { $set : { "saldo" : comanda.saldo}})
  }

  static async pay(comandaId: string, eventId:string) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    const dbResult = await db.updateOne({ id: comandaId, evento: eventId }, { $set: { "pago": true } })
    return (dbResult.modifiedCount>0) ? true : false
  }

  static async atualizar(companyId: string, eventId: string, command: Comanda) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    return db.updateOne(
      { realizador: companyId, id: eventId, 'comandas.id': command.id },
      {
        $set: {
          'comandas.$' : command
        }
      }
    )
  }
}