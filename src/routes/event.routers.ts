import { Router } from "express";
import { createEvent, findEvent, getEvent, getEvents } from "../controllers/Event";
import { ArquivedEvent } from "../controllers/Event/archiveEvent";
import { ExpressAdapterRouter } from "../utils/adapter";

export const event_routers = Router()

event_routers.post("/create", ExpressAdapterRouter.adapt(new createEvent()))
event_routers.get("/find", ExpressAdapterRouter.adapt(new findEvent()))
event_routers.get("/getEvents", ExpressAdapterRouter.adapt(new getEvents()))
event_routers.get("/:eventId/getEvent", ExpressAdapterRouter.adapt(new getEvent()))


event_routers.put("/:eventId/archive/:status", ExpressAdapterRouter.adapt(new ArquivedEvent()))

