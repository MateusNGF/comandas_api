import express from 'express'
import dotenv from 'dotenv'
import { event_routers, company_routers, command_routes } from './routes'
import { verify } from './utils'
dotenv.config()

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/empresa", company_routers)
app.use("/evento", verify, event_routers)
app.use("/comanda", verify, command_routes)

app.listen(process.env.PORT, () => {
  console.log(`running in http://localhost:${process.env.PORT}`)
})


