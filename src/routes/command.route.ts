import Express from 'express'
import { CreateCommand } from '../controllers/Commands'
import { ManagerProductInCommand } from '../controllers/Commands/ManagerProductsInCommand'
import { ExpressAdapterRouter, verify } from '../utils'

export const command_routes = Express.Router()

command_routes.post("/:eventId/create", verify, ExpressAdapterRouter.adapt(new CreateCommand()))
command_routes.post("/:eventId/:commandId/:action/produto", verify, ExpressAdapterRouter.adapt(new ManagerProductInCommand()))
