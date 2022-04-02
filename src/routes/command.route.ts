import Express from 'express'
import { CreateCommand, GetCommand, ManagerProductInCommand, PayCommand } from '../controllers/commands'
import { ExpressAdapterRouter, verify } from '../utils'

export const command_routes = Express.Router()

command_routes.post("/:eventId/criar", verify,
   /**
    * #swagger.tags = ["Comandas"]
    */
  ExpressAdapterRouter.adapt(new CreateCommand()))

command_routes.post("/:eventId/:commandId/:action/produto/:productId", verify, 
   /**
    * #swagger.tags = ["Comandas"]
    */
  ExpressAdapterRouter.adapt(new ManagerProductInCommand()))

command_routes.put("/:eventId/:commandId/pagar", verify, 
   /**
    * #swagger.tags = ["Comandas"]
    */
  ExpressAdapterRouter.adapt(new PayCommand()))

command_routes.get("/:eventId/:commandId/pegar", verify, 
   /**
    * #swagger.tags = ["Comandas"]
    */
  ExpressAdapterRouter.adapt(new GetCommand()))


