import { ObjectId } from "mongodb";
import { v4 as GeneratorId } from "uuid";
import { MongoConnector } from "../database/MongoConnector";
import { Comanda } from "../entities/comanda.dto";


let collection = 'comandas'

export class CommandsRepository {
  static async checkUseNUmber(numero: Number, eventoId : string) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    return db.findOne({ evento : eventoId, numero}, { projection : { "status" : true }})
  }

  static async create(comanda: Comanda) {
    const db = (await new MongoConnector().connect()).collection<Comanda>(collection)
    comanda.id = GeneratorId()
    return db.insertOne(comanda)
  }
}