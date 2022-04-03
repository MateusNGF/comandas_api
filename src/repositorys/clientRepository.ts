import { MongoConnector } from "../database/MongoConnector"
import { Cliente, Visitante } from "../entities"
import { BadRequest, DatabaseError, gerarID } from "../utils"

const collection: string = 'clientes'

export class ClienteRepository {

  static async get(companyId: string, clientId: string) {
    const db = (await new MongoConnector().connect()).collection(collection)
  }

  static async create(cliente: Visitante) {
    const db = (await new MongoConnector().connect()).collection<Visitante>(collection)

    const registrado = await db.findOne({ cpf: cliente.cpf })
    if (registrado) return registrado

    cliente.id = gerarID("cliente")
    if ((await db.insertOne(cliente)).insertedId) return cliente
    throw new DatabaseError("Não foi possivel criar o cliente no banco.")
  }

  static async find(cpf: string, nome?: string, email?: string) {
    const db = (await new MongoConnector().connect()).collection<Visitante>(collection)
    return db.findOne({
      $or: [{cpf}, {nome}, {email}]
    })
  }
}