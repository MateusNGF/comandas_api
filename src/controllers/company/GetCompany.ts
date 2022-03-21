import { CompanyRepository } from "../../repositorys";
import { IController, Messenger, typeCustomRequest, typeCustomResponse } from "../../utils";

export class GetCompany implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const companyId: string = request.header.company.id 
      
      return Messenger.success(await CompanyRepository.getCompany(companyId))
    } catch (error) {
      return Messenger.error(error)
    }
  }
}