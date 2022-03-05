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

  static async getEvent(eventId: string, companyId: string ) {
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
        $set: {
          pagos: {
            $filter: {
              input: '$comandas',
              as: 'comanda',
              cond: {$eq: ['$$comanda.pago', true]}
            }
          },
          pendente: {
            $filter: {
              input: '$comandas',
              as: 'comanda',
              cond: {$eq: ['$$comanda.pago', false]}
            }
          }
        }
      }, {
        $set: {
          status: {
            $cond : [{data_fim : {$lte : new Date().toISOString}}, "Finalizado", "Acontecendo"]
          },
          lucro: {$sum : '$pagos.saldo'},
          lucro_pendente: {$sum: '$pendente.saldo'}
        }
      }
    ]).toArray()
  }
  
  static async create(newEvent: Evento) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return db.insertOne(newEvent)
  }
}