import { props } from "./setters"

export default {
  ptbr: {
    controllers: {
      company: {
        access: {
          missingParam: "Acesso não autorizado. CNPJ ou Email são necessários juntamento com a senha.",
          companyFailedAccess: "Não foi possivel acessar sua conta. Verifique seu Email e sua senha."
        },
        register: {
          companyRegistred: (param: string) => { return `O parametro '${param}' já esta registrado em uma empresa, tente acessa-la.` },
        },
        validation: {
          minLenght: (param: string) => { return `Insira um texto maior para '${param}', fuciona apartir de ${props.entities.company[param.toString()].text.min} carácteres.` },
          maxLenght: (param: string) => { return `O texto em '${param}' é muito grande, tente por menor que ${props.entities.company[param.toString()].text.max} carácteres.` } 
        }
      },
      event: {
        findEvent: {
          missingParams: "Não foi possivel realizar a busca. Tente informar o nome ou id do evento."
        },
        create: {
          insertFailed: "Não foi possivel criar seu evento, tente novamente mais tarde.",
          dateInvalid: "As datas são invalidas, a data de inicio é maior que a data do fim.",
          dateStartInvalid : `O evento só pode ser criado até um mês atrás (${props.entities.evento.minDateInicio}).`
        },
        archiveFailed: "Não foi possivel arquivar o evento, tente novamente.",
        unarchiveFailed: "Não foi possivel desarquivar o evento, tente novamente.",
        eventNotFound: "O evento não foi encontrado.",
        validation: {
          minLenght: (param: string) => { return `Insira um texto maior para '${param}', fuciona apartir de ${props.entities.evento[param.toString()].text.min} carácteres.` },
          maxLenght: (param: string) => { return `O texto em '${param}' é muito grande, tente por menor que ${props.entities.evento[param.toString()].text.max} carácteres.` }
        }
      },
      command: {
        insertFailed: "Não foi possivel adicionar essa comanda ao evento, porfavor tente mais tarde.",
        inUse: "Essa comanda já esta em uso. tente atribuir outra.",
        NotFound: "Essa comanda especifica não foi encontrada.",
        operationRefused: "Não foi possivel realizar essa operação. Verifique a requisição ou tente novamente.",
        negativeBalance: "O saldo ao remover vai ficar negativo, algo deu errado. MUITO ERRADO!!!",
        undefinedError : "Algo deu errado ao atualizar saldo, tente executar novamente essa operação."
      }
    },
    jwt: {
      missingToken: "Chave de autorização não informada. Acesso recusado.",
      invalidKey: "Chave informada não reconhecida. Acesso recusado.",
      missingParams : "Informe os parametros para serem inseridos no token."
    },
    errors: {
      missingParam: (param: string) => { return `É necessario informar o parametro '${param}' para conseguir realizar esta ação.`},
      unexpectedParam: (param: string) => { return `O parametro '${param}' não é necessario para essa ação, remova-o.` },
      invalidFormat : (param:string) => { return `O ${param} esta mal formatado, tente inserir um valor correto.`}
    }
  }
}