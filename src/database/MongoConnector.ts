import { Collection, Db, MongoClient } from "mongodb"

export class MongoConnector {

  database: Db = null
  
  connect(): Promise<Db> {
    return new Promise((resolve, reject) => {
      if (!this.database) {
        MongoClient.connect(process.env.MONGO_HOST, (e, client) => {
          if (e) reject(new Error("Database connect failed : " + e.message))
          resolve(this.database = client.db(process.env.MONGO_DB))
        })
      } else {
        resolve(this.database)
      }
    })
  }

  async con(): Promise<Db> {
    const mongoCLiente: MongoClient = await MongoClient.connect(process.env.MONGO_HOST)
    return mongoCLiente.db(process.env.MONGO_DB)
  }
}