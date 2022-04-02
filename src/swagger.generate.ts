const swaggerAutogen = require('swagger-autogen')()

const headerConfig = {
  "info": {
    "title": "Comandas",
    "description": "Essa pagina é referente a documentação de todas as rotas disponivel na aplicação, todas as informações necessarias para realizar a consulta.",
    "version": "1.1.0"
  },
  "host" : "http://localhost:8100",
  "servers": [
    {
      "url": "http://localhost:8100",
      "description": "Development server"
    }
  ],
  "tags": [
    {
      "name": "Empresa",
      "description": "préfixo `__host/empresa`"
    },{
      "name": "Produtos",
      "description": "préfixo `__host/empresa`"
    },
    {
      "name": "Eventos",
      "description": "préfixo `__host/evento`"
    },{
      "name": "Comandas",
      "description": "préfixo `__host/comanda`"
    }
  ]
}

const outputSwaggerConfiguration = './swagger.json'
const endPoints = ["./src/routes/*.route.ts"]

swaggerAutogen(outputSwaggerConfiguration, endPoints, headerConfig, async () => {
  require('./app')
})