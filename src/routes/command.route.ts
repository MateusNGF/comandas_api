import Express from 'express'
import { CreateCommand, ManagerProductInCommand, PayCommand } from '../controllers/Commands'
import { ExpressAdapterRouter, verify } from '../utils'

export const command_routes = Express.Router()

command_routes.post("/:eventId/criar", verify, ExpressAdapterRouter.adapt(new CreateCommand()))
command_routes.post("/:eventId/:commandId/:action/produto", verify, ExpressAdapterRouter.adapt(new ManagerProductInCommand()))
command_routes.put("/:eventId/:commandId/pagar", verify, ExpressAdapterRouter.adapt(new PayCommand()))

