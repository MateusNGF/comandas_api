import { v4 as GeneratorId } from "uuid"
import { MongoConnector } from "../database/MongoConnector"
import { Evento } from "../entities"

const collection: string = 'eventos'

export class EventRepositry {
  
  static async findByNome(eventNome: string, companyId : string) {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    return db.find({
      realizador: companyId,
      $text: { $search: eventNome }
    }).sort({ data_inicio: 1 }).toArray()
  }

  static async findById(eventId: string, companyId: string) {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    return db.findOne({realizador: companyId, id: eventId})
  }

  static async create(evento: Evento) {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    evento.id = GeneratorId()
    return db.insertOne(evento)
  }

  static async archive(eventId: string, companyId: string) : Promise<boolean>{
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    const result = await db.updateOne(
      { id: eventId, realizador: companyId },
      {
        $set: { "arquivado": true }
      }
    )
    return (result.modifiedCount == 1) ? true : false
  }

  static async unarchive(eventId: string, companyId: string): Promise<boolean> {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    const result = await db.updateOne(
      { id: eventId, realizador: companyId },
      { $set: { "arquivado": false } }
    )
    return (result.modifiedCount == 1) ? true : false
  }

  static async getEvents(companyId: string) {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    return db.find(
      { realizador: companyId },
      { projection: { realizador: 0 } })
      .sort({ data_inicio: 1 }).limit(10).toArray()
  }

  static async getEvent(eventId: string, companyId: string ) {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    return db.aggregate([
      {
        $match: {realizador: companyId,id: eventId}
      },
      {
        $lookup: {
          from: 'comandas',
          localField: 'id',
          foreignField: 'evento',
          as: 'comandas'
        }
      }
    ]).toArray()
  }
}
