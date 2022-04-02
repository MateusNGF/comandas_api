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

event_routers.post("/criar", ExpressAdapterRouter.adapt(new createEvent()))
event_routers.get("/procurar", ExpressAdapterRouter.adapt(new findEvent()))
event_routers.get("/listar", ExpressAdapterRouter.adapt(new getEvents()))
event_routers.get("/listar/categorias", ExpressAdapterRouter.adapt(new getCategories()))
event_routers.get("/listar/agrupado/categoria", ExpressAdapterRouter.adapt(new groupEventsByCategory()))

event_routers.get("/:eventId/get", ExpressAdapterRouter.adapt(new getEvent()))
event_routers.put("/:eventId/arquivar/:status", ExpressAdapterRouter.adapt(new ArquivedEvent()))

