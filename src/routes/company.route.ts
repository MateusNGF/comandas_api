import { Router } from "express";
import { RegisterCompany } from "../controllers/Company";
import { AccessCompany } from "../controllers/Company/AccessCompany";
import { ExpressAdapterRouter } from "../utils/adapter";


export const company_routers = Router()

company_routers.get("/acessar", ExpressAdapterRouter.adapt(new AccessCompany()))
company_routers.post("/registrar", ExpressAdapterRouter.adapt(new RegisterCompany()))

