import { v4 as GeneretorId } from "uuid"
import { MongoConnector } from "../database/MongoConnector"
import { Empresa, Produto, ProdutoEstoque } from "../entities"
import { DatabaseError, gerarID } from "../utils"

const colletion: string = 'empresas'

export class ProdutoRepositorio {
  static async adicionar(empresaID: string, produto: ProdutoEstoque) {
    const db = (await new MongoConnector().connect()).collection<Empresa>(colletion)
    produto.id = gerarID("empresa")
    let dbResult = await db.updateOne(
      { id: empresaID },
      {
        $push: { "produtos": produto }
      }
    )
    return (dbResult.matchedCount) ? true : false
  }

  static async remover(companyId: string, productId: string) {
    const db = (await new MongoConnector().connect()).collection(colletion)
    const dbResult = await db.updateOne(
      { id: companyId },
      {
        $pull: {
          produtos: {
            id: productId
          }
        }
      }
    )
    return (dbResult.modifiedCount) ? true : false
  }


  static async list(companyId:string) {
    const db = (await new MongoConnector().connect()).collection<Array<ProdutoEstoque>>(colletion)
    return db.findOne({ id : companyId}, { projection : { _id : 0, produtos : 1}})
  }

  static async atualizar(companyId: string, produto: ProdutoEstoque) {
    const db = (await new MongoConnector().connect()).collection<Empresa>(colletion)
    const dbResult = await db.updateOne(
      { id: companyId, 'produtos.id': produto.id },
      {
        $set: {
          "produtos.$": produto
        }
      }
    )
    return (dbResult.modifiedCount) ? true : false
  }
  
}