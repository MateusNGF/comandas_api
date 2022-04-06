import { Router } from "express";
import { AccessCompany, AddAccountOfPayment, GetCompany, RegisterCompany } from "../controllers/company";
import { AddProduct, ListProducts, RemoveProduct } from "../controllers/product";
import { verify } from "../utils";
import { ExpressAdapterRouter } from "../utils/adapter";


export const company_routers = Router()

company_routers.get("/acessar", 
  /**
    #swagger.tags = ["Empresa"]
    #swagger.summary = "Acessa a conta existente de um empresa pelo CNPJ ou Email."
    #swagger.description = ""
   */
  ExpressAdapterRouter.adapt(new AccessCompany()))

company_routers.post("/registrar", 
  /**
    #swagger.tags = ["Empresa"]
    #swagger.summary = "Registra uma nova empresa com base no corpo da requisição informado."
    #swagger.description = ""
   */
  ExpressAdapterRouter.adapt(new RegisterCompany()))

company_routers.get("/buscar", verify, 
  /**
    #swagger.tags = ["Empresa"]
    #swagger.summary = "Retorna `todas` as informações da company. "
    #swagger.description = ""
   */
  ExpressAdapterRouter.adapt(new GetCompany()))



// ==================================================
// ============= PRODUTOS DA EMPRESA ================
// ==================================================

company_routers.get("/produtos/listar", verify, 
  /**
    #swagger.tags = ["Produtos"]
    #swagger.summary = "Lista com base no estoque os produtos da empresa."
    #swagger.description = ""
   */
  ExpressAdapterRouter.adapt(new ListProducts()))

company_routers.post("/produtos/adicionar", verify, 
  /**
    #swagger.tags = ["Produtos"]
    #swagger.summary = "Adicionar um novo produto ao estoque da empresa."
    #swagger.description = ""
   */
  ExpressAdapterRouter.adapt(new AddProduct()))

company_routers.put("/produtos/remover/:productId", verify, 
  /**
    #swagger.tags = ["Produtos"]
    #swagger.summary = "Remove um produto cadastrado no estoque com base no id passado."
    #swagger.description = ""
   */
  ExpressAdapterRouter.adapt(new RemoveProduct()))




// ==================================================
// ============= PAGAMENTOS =========================
// ==================================================


company_routers.post("/pagamentos/adicionar/bancario", verify,
  /**
   #swagger.tags = ["Empresa"]
   #swagger.summary = "Adicionar uma conta bancaria na compania para realização de transações." 
   */
ExpressAdapterRouter.adapt(new AddAccountOfPayment()))



