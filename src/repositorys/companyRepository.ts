import { ObjectId } from "mongodb";
import { v4 as GeneratorId } from "uuid";
import { MongoConnector } from "../database/MongoConnector";
import { Company } from "../entities";
import { Comanda } from "../entities/comanda.dto";

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

  static async accessCompany(companyIdentifier: string, companySenha: string){
    const db = (await new MongoConnector().connect()).collection<Company>(collection)
    return (await db.aggregate([
      { $match: { $or: [{ email: companyIdentifier }, { cnpj: companyIdentifier }] } },
      {
        $redact: {
          $cond: {
            if: { $eq: ["$senha", companySenha] },
            then: "$$DESCEND",
            else: "$$PRUNE"
          }
        }
      },
      { $project: { senha: 0 } }
    ]).toArray())[0]
  }

  static async create(company: Company) {
    const db = (await new MongoConnector().connect()).collection<Company>(collection)
    company.id = GeneratorId()
    return db.insertOne(company, {writeConcern : {j:true, wtimeout: 1000}})
  }
}