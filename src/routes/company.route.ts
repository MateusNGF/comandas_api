import { Router } from "express";
import { AccessCompany } from "../controllers/Company/AccessCompany";
import { ExpressAdapterRouter } from "../utils/adapter";


export const company_routers = Router()

company_routers.get("/access", ExpressAdapterRouter.adapt(new AccessCompany()))

