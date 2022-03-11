import Express from 'express'
import { CreateCommand } from '../controllers/Commands'
import { ExpressAdapterRouter, verify } from '../utils'

export const command_routes = Express.Router()

command_routes.post("/:eventId/create", verify, ExpressAdapterRouter.adapt(new CreateCommand()))