import { v4 as GeneratorId } from "uuid";
import { MongoConnector } from "../database/MongoConnector";
import { Empresa, Produto } from "../entities";

const collection : string = 'empresas'

export class CompanyRepository {
  static async findCompanyById(companyId: string): Promise<Empresa> {
    const db = (await new MongoConnector().connect()).collection<Empresa>(collection)
    return db.findOne({ id : companyId })
  }

  static async findCompanyByCNPJ(companyCNPJ: string): Promise<Empresa> {
    const db = (await new MongoConnector().connect()).collection<Empresa>(collection)
    return db.findOne({ cnpj: companyCNPJ })
  }

  static async findCompanyByEMail(companyEmail: string): Promise<Empresa> {
    const db = (await new MongoConnector().connect()).collection<Empresa>(collection)
    return db.findOne({ email: companyEmail })
  }

  static async accessCompany(companyIdentifier: string, companySenha: string) {
    const db = (await new MongoConnector().connect()).collection<Empresa>(collection)
    return db.findOne({
      $or: [{ email: companyIdentifier }, { cnpj: companyIdentifier }],
      senha : companySenha
    }, { projection: { responsavel: 1, email : 1, cnpj : 1, telefone : 1, nome : 1, id :1, _id : 0  } })
  }

  static async create(company: Empresa) {
    const db = (await new MongoConnector().connect()).collection<Empresa>(collection)
    company.id = GeneratorId()
    return db.insertOne(company, {writeConcern : {j:true, wtimeout: 1000}})
  }

  static async getCompany(companyId: string) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return (await db.aggregate<Empresa>([
      { $match: { id: companyId } },
      {
        $lookup: {
          from: 'eventos',
          localField: 'id',
          foreignField: 'realizador',
          as: 'eventos'
        }
      },
      {
        $project: {
          senha: 0,
          _id : 0
        }
      }
    ]).toArray())[0]
  }
}