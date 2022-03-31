import express from 'express'
import { event_routers, company_routers, command_routes, statistics_routes } from './routes'
import { verify } from './utils'

export const app = express() 

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/empresa", company_routers)
app.use("/evento", verify, event_routers)
app.use("/comanda", verify, command_routes)
app.use("/estatisticas", verify, statistics_routes)

export default app


