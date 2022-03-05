import { Router } from "express";
import { createEvent, findEvent, getEvent, getEvents } from "../controllers/Event";
import { ExpressAdapterRouter } from "../utils/adapter";
import { verify } from "../utils/JsonWebToken";

export const event_routers = Router()

event_routers.post("/create", verify, ExpressAdapterRouter.adapt(new createEvent()))
event_routers.get("/find", verify, ExpressAdapterRouter.adapt(new findEvent()))
event_routers.get("/list", verify, ExpressAdapterRouter.adapt(new getEvents()))
event_routers.get("/:eventId/get-information", verify, ExpressAdapterRouter.adapt(new getEvent()))
