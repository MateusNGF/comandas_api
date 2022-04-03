const swaggerAutogen = require('swagger-autogen')()

const header = require('./utils/swagger/header.json')
const definitions = require('./utils/swagger/definitions.json')

header["definitions"] = definitions

const output = './swagger.json'
const inputs = ["./src/routes/*.route.ts"]

swaggerAutogen(output, inputs, header, async () => {
  require('./app')
})