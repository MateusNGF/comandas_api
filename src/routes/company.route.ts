import { Router } from "express";
import { AccessCompany, GetCompany, RegisterCompany } from "../controllers/company";
import { AddProduct, ListProducts, RemoveProduct } from "../controllers/product";
import { verify } from "../utils";
import { ExpressAdapterRouter } from "../utils/adapter";


export const company_routers = Router()

company_routers.get("/acessar", ExpressAdapterRouter.adapt(new AccessCompany()))
company_routers.post("/registrar", ExpressAdapterRouter.adapt(new RegisterCompany()))
company_routers.get("/buscar", verify, ExpressAdapterRouter.adapt(new GetCompany()))

company_routers.get("/produtos/listar", verify, ExpressAdapterRouter.adapt(new ListProducts()))
company_routers.post("/produtos/adicionar", verify, ExpressAdapterRouter.adapt(new AddProduct()))
company_routers.put("/produtos/remover/:productId", verify, ExpressAdapterRouter.adapt(new RemoveProduct()))



