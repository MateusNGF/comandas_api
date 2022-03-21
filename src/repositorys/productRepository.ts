import { v4 as GeneretorId } from "uuid"
import { MongoConnector } from "../database/MongoConnector"
import { Empresa, Produto, ProdutoEstoque } from "../entities"

const colletion: string = 'empresas'

export class ProductRepository {
  static async add(companyId: string, product: Produto) {
    const db = (await new MongoConnector().connect()).collection<Empresa>(colletion)
    product.id = GeneretorId()
    let dbResult = await db.updateOne(
      { id: companyId },
      {
        $push: { "produtos": product }
      }
    )
    return (dbResult.modifiedCount) ? true : false
  }

  static async remove(companyId: string, productId: string) {
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
      { id: companyId, 'produtos.id' : produto.id },
      {
        $set: {
          "produtos.$" : produto
        }
      }
    )
   return (dbResult.modifiedCount)?true:false
  }
  
}