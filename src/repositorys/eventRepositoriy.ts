import { MongoConnector } from "../database/MongoConnector"
import { Evento } from "../entities"

const collection: string = 'eventos'

export class EventRepositry {
  
  static async findByNome(eventNome: string, companyId : string) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return db.find({ realizador: companyId, $text: { $search: eventNome } }).sort({ data_inicio : 1}).toArray()
  }

  static async findById(eventId: string, companyId: string) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return db.findOne({ realizador: companyId, id : eventId})
  }

  static async getEvents(companyId: string) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return db.find({ realizador : companyId }).toArray()
  }

  static async getEvent(eventId: string, companyId: string) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return db.aggregate([
      { $match: { id : eventId, realizador: companyId} },
      {
        $lookup: {
          from: 'comandas',
          localField: 'id',
          foreignField: 'evento',
          as: 'comandas'
        }
      }, {
        $facet: {
          saldo_pago: [{
            $filter: {
              input: "$comandas",
              as: 'comanda',
              cond: {
                $eq: ["$$comanda.pago", true]
              }
            }
          }]
        }
      }
    ]).toArray()
  }
  
  static async create(newEvent: Evento) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return db.insertOne(newEvent)
  }
}