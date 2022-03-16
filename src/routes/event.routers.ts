import { Router } from "express";
import { createEvent, findEvent, getEvent, getEvents } from "../controllers/Event";
import { ArquivedEvent } from "../controllers/Event/archiveEvent";
import { ExpressAdapterRouter } from "../utils/adapter";

export const event_routers = Router()

event_routers.post("/criar", ExpressAdapterRouter.adapt(new createEvent()))
event_routers.get("/procurar", ExpressAdapterRouter.adapt(new findEvent()))
event_routers.get("/listar", ExpressAdapterRouter.adapt(new getEvents()))
event_routers.get("/:eventId/get", ExpressAdapterRouter.adapt(new getEvent()))


event_routers.put("/:eventId/arquivar/:status", ExpressAdapterRouter.adapt(new ArquivedEvent()))

