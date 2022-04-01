import { v4 as GeneratorId } from "uuid"
import { MongoConnector } from "../database/MongoConnector"
import { Comanda, Evento } from "../entities"

const collection: string = 'eventos'

export class EventRepository {
  
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
      { projection: { realizador: 0, _id : 0, comandas: 0} })
      .sort({ criado_em: -1 }).toArray()
  }

  static async groupEventosByCategory(companyId: string) {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    return db.aggregate([
      { $match: { "realizador": companyId } },
      {
        $group: {
          _id: "$categoria",
          quantidade: {
            $sum : 1
          },
          eventos: {
            $push : '$$ROOT'
          }
      }}
    ]).toArray()
  }

  static async getEvent(eventId: string, companyId: string ) {
    const db = (await new MongoConnector().connect()).collection<Evento>(collection)
    return db.findOne({realizador: companyId, id: eventId })
  }
}
