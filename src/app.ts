import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { event_routers, company_routers } from './routes'
dotenv.config()

export const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/company", company_routers)
app.use("/event", event_routers)

app.listen(process.env.PORT, () => {
  console.log(`running in http://localhost:${process.env.PORT}`)
})


