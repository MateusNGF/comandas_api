const currentDate = new Date()

export const props = {
  entities: {
    company: {
      empresa: { text: { min: 10, max: 30 } },
      responsavel: { text : {min: 10, max:30}}
    },
    evento: {
      nome: { text: { min: 10, max: 30 } },
      defaultMaximoSaldo: 300,
      minDateInicio: `${currentDate.getFullYear()}/${(currentDate.getMonth() - 1)}/${currentDate.getDate()}`
    }
  },
  
}