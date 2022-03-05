export default {
  ptbr: {
    controllers: {
      company: {
        access: {
          missingParam: "Acesso não autorizado. CNPJ ou Email são necessários juntamento com a senha.",
          companyFailedAccess: "Não foi possivel acessar sua conta. Verifique seu Email e sua senha."
        }
      },
      event: {
        getEventByNomeOrId: {
          missingParams : "Não foi possivel realizar a busca. Tente informar o nome do evento ou seu id."
        },
        create: {
          insertFailed : "Não foi possivel criar seu evento, tente novamente mais tarde.",
          methods: {
            paramIsRequired: (param : string) => {
              return `Você precisa informar o ${param} para criar um novo evento.`
            },
            paramNotIsRequired: (param: string) => {
              return `O ${param} não é necessario para criação de um novo evento.`
            }
          }
        }
      }
    },
    jwt: {
      missingToken: "Chave de autorização não informada. Acesso recusado.",
      invalidKey: "Chave informada não reconhecida. Acesso recusado.",
      missingParams : "Informe os parametros para serem inseridos no token."
    },
    errors: {
      missingParam: (param: string) => { return `É necessario informar o parametro >> ${param} para conseguir realizar esta ação.` },
      unexpectedParam: (param: string) => { return `O parametro > ${param} não é necessario para essa ação, remova-o.`}
    }
  }
}