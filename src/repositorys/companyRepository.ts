import { MongoConnector } from "../database/MongoConnector";

const collection : string = 'empresas'

export class CompanyRepository {
  static async findCompanyById(companyId: string): Promise<any>  {
    const db = (await new MongoConnector().connect()).collection(collection)
    return await db.findOne({ id : companyId})
  }

  static async findCompanyByCNPJ(companyCNPJ: string): Promise<any> {
    const db = (await new MongoConnector().connect()).collection(collection)
    return await db.findOne({ cnpj: companyCNPJ })
  }

  static async findCompanyByEMail(companyEmail: string): Promise<any> {
    const db = (await new MongoConnector().connect()).collection(collection)
    return await db.findOne({ email: companyEmail })
  }

  static async accessCompany(companyIdentifier: string, companySenha : string){
    const db = (await new MongoConnector().connect()).collection(collection)
    return (await db.aggregate([
      {$match: {$or: [{email: companyIdentifier}, {cnpj: companyIdentifier} ]}, senha : companySenha},
      {
        $redact: {
          $cond: {
            if: { $eq: ["$senha", companySenha] },
            then: "$$DESCEND",
            else: "$$PRUNE"
          }
        }
      },
      {$project: {_id : 0, senha : 0}}
    ]).toArray())[0]
  }

  static async getAllInformationCompany(companyId: string): Promise<any> {
    const db = (await new MongoConnector().connect()).collection(collection)
    return await db.aggregate([
      { $match: { id: companyId } },
      { $limit: 1 },
      {
        $lookup: {
          from: "clientes",
          localField: 'id',
          foreignField: 'empresa',
          as: 'clientes'
        }
      },
      {
        $lookup: {
          from: "eventos",
          localField: 'id',
          foreignField: 'realizador',
          as: 'eventos'
        }
      }
    ]).toArray()
  }

  static async billingDaily(): Promise<any> {
    const dateNow = new Date().toISOString()
      // pegar todoas as demandas de eventos que então acontecendo.
      // verificar se as datas dos ventos.
      // verificar os status das comadnas.
  }

  static async billingByDate(startDate : Date, endDate : Date): Promise<any> {
    // pegar todos os eventos de eventos que estão entre start e end date.
    // verificar se as datas dos ventos.
    // verificar os status das comadnas.
  }
}