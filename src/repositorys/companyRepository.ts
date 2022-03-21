import { v4 as GeneratorId } from "uuid";
import { MongoConnector } from "../database/MongoConnector";
import { Company, Produto } from "../entities";

const collection : string = 'empresas'

export class CompanyRepository {
  static async findCompanyById(companyId: string): Promise<Company> {
    const db = (await new MongoConnector().connect()).collection<Company>(collection)
    return db.findOne({ id : companyId })
  }

  static async findCompanyByCNPJ(companyCNPJ: string): Promise<Company> {
    const db = (await new MongoConnector().connect()).collection<Company>(collection)
    return db.findOne({ cnpj: companyCNPJ })
  }

  static async findCompanyByEMail(companyEmail: string): Promise<Company> {
    const db = (await new MongoConnector().connect()).collection<Company>(collection)
    return db.findOne({ email: companyEmail })
  }

  static async accessCompany(companyIdentifier: string, companySenha: string) {
    const db = (await new MongoConnector().connect()).collection<Company>(collection)
    return db.findOne({
      $or: [{ email: companyIdentifier }, { cnpj: companyIdentifier }],
      senha : companySenha
    }, { projection: { responsavel: 1, email : 1, cnpj : 1, telefone : 1, nome : 1, id :1, _id : 0  } })
  }

  static async create(company: Company) {
    const db = (await new MongoConnector().connect()).collection<Company>(collection)
    company.id = GeneratorId()
    return db.insertOne(company, {writeConcern : {j:true, wtimeout: 1000}})
  }

  static async getCompany(companyId: string) {
    const db = (await new MongoConnector().connect()).collection(collection)
    return (await db.aggregate<Company>([
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