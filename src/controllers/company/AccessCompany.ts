import { CompanyRepository } from "../../repositorys"
import { IController, Messenger, typeCustomRequest, typeCustomResponse, Unauthorized } from "../../utils"
import text_schema from "../../utils/configurations/textSchema"
import { buildBody } from "../../utils/JsonWebToken"

export class AccessCompany implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const { cnpj, email, senha } = request.body
      let identifier: string = email ? email : cnpj 
      
      if (!identifier || !senha) {
        throw new Unauthorized(text_schema.ptbr.controllers.company.access.missingParam)
      }

      const companyCurrent = await CompanyRepository.accessCompany(identifier, senha)
      if (!companyCurrent) {
        throw new Unauthorized(text_schema.ptbr.controllers.company.access.companyFailedAccess)
      }
      
      return Messenger.success(buildBody(companyCurrent))
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}