import { ExpressAdapterRouter } from "../utils/adapter";
import { Router } from "express";
import {
  ArquivedEvent,
  createEvent,
  findEvent,
  getCategories,
  getEvent,
  getEvents,
  groupEventsByCategory
} from "../controllers/event";

export const event_routers = Router()

event_routers.post("/criar", 
  /**
    #swagger.tags = ["Eventos"]
    #swagger.summary = "Cria um novo evento para empresa."
   */
  ExpressAdapterRouter.adapt(new createEvent()))
event_routers.get("/procurar", 
  /**
    #swagger.tags = ["Eventos"]
    #swagger.summary = "Procura um evento ou por nome ou pelo seu id."
   */
  ExpressAdapterRouter.adapt(new findEvent()))
event_routers.get("/listar", 
  /**
    #swagger.tags = ["Eventos"]
    #swagger.summary = "Lista todos os eventos associados a empresa."
   */
  ExpressAdapterRouter.adapt(new getEvents()))
event_routers.get("/listar/categorias", 
  /**
    #swagger.tags = ["Eventos"]
    #swagger.summary = "Lista todas as categorias de eventos."
   */
  ExpressAdapterRouter.adapt(new getCategories()))
event_routers.get("/listar/agrupado/categoria", 
  /**
    #swagger.tags = ["Eventos"]
    #swagger.summary = "Lista os eventos agrupados pela sua categoria."
   */
  ExpressAdapterRouter.adapt(new groupEventsByCategory()))


event_routers.get("/:eventId/get", 
  /**
    #swagger.tags = ["Eventos"]
    #swagger.summary = "Pega um evento com toda sua informação com base no id."
   */
  ExpressAdapterRouter.adapt(new getEvent()))
event_routers.put("/:eventId/arquivar/:status", 
  /**
    #swagger.tags = ["Eventos"]
    #swagger.summary = "Arquiva ou Desarquiva um evento."
   */
  ExpressAdapterRouter.adapt(new ArquivedEvent()))

