import { Router } from "express";
import multer from "multer";
import { createEvent, findEvent, getEvent, getEvents, groupEventsByCategory } from "../controllers/event";
import { ArquivedEvent } from "../controllers/event/archiveEvent";
import { ExpressAdapterRouter } from "../utils/adapter";

export const event_routers = Router()

event_routers.post("/criar", ExpressAdapterRouter.adapt(new createEvent()))
event_routers.get("/procurar", ExpressAdapterRouter.adapt(new findEvent()))
event_routers.get("/listar", ExpressAdapterRouter.adapt(new getEvents()))
event_routers.get("/listar/agrupado/categoria", ExpressAdapterRouter.adapt(new groupEventsByCategory()))
event_routers.get("/:eventId/get", ExpressAdapterRouter.adapt(new getEvent()))
multer()


event_routers.put("/:eventId/arquivar/:status", ExpressAdapterRouter.adapt(new ArquivedEvent()))

