import { Company } from "../../entities";
import { CompanyRepository } from "../../repositorys";
import { BadRequest as BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import schemasTexts from "../../utils/configurations/textSchema";
const texts = schemasTexts.ptbr.controllers.company.register

export class RegisterCompany implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {

      ObjectManager.hasKeys(["responsavel", "nome", "cnpj", "email", "telefone", "senha"], request.body)

      let company: Company = new Company(request.body)

      if (await CompanyRepository.findCompanyByEMail(company.email)) {
        throw new BadRequest(texts.companyRegistred('Email'))
      } else if (await CompanyRepository.findCompanyByCNPJ(company.cnpj)) {
        throw new BadRequest(texts.companyRegistred('CNPJ'))
      }
      
      company.criado_em = new Date().toISOString()
      company.atualizado_em = new Date().toISOString()
      company.produtos = []

      const result = await CompanyRepository.create(company)
      return Messenger.success(result)
    } catch (erro) {
      return Messenger.error(erro)
    }
  }
}