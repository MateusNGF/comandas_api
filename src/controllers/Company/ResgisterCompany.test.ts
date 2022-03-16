import { typeCustomRequest, typeCustomResponse } from "../../utils";
import {RegisterCompany} from './RegisterCompany' 

const endPoint = new RegisterCompany()


const customRequest: typeCustomRequest = {}

test('Deve retornar status 400 se faltar o Responsavel', async () => {

  customRequest.body = {}

  const httpResponse : typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se faltar a Empresa', async () => {

  customRequest.body = {
    "responsavel" : ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se faltar o CNPJ', async () => {

  customRequest.body = {
    "responsavel": "",
    "empresa" : ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se faltar o Email', async () => {

  customRequest.body = {
    "responsavel": "",
    "empresa": "",
    "cnpj" : ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se faltar o Telefone', async () => {

  customRequest.body = {
    "responsavel": "",
    "empresa": "",
    "cnpj": "",
    "email" : ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se faltar a Senha', async () => {

  customRequest.body = {
    "responsavel": "",
    "empresa": "",
    "cnpj": "",
    "email": "",
    "telefone": ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o responsavel for vazio', async () => {

  customRequest.body = {
    "responsavel": "",
    "empresa": "",
    "cnpj": "",
    "email": "",
    "telefone": "",
    "senha" : ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se a empresa for vazio', async () => {

  customRequest.body = {
    "responsavel": "xxx",
    "empresa": "",
    "cnpj": "",
    "email": "",
    "telefone": "",
    "senha": ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o CNPJ for vazio', async () => {

  customRequest.body = {
    "responsavel": "xxx",
    "empresa": "xxx",
    "cnpj": "",
    "email": "",
    "telefone": "",
    "senha": ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o Email for vazio', async () => {

  customRequest.body = {
    "responsavel": "xxx",
    "empresa": "xxx",
    "cnpj": "xxx",
    "email": "",
    "telefone": "",
    "senha": ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o Telefone for vazio', async () => {

  customRequest.body = {
    "responsavel": "xxx",
    "empresa": "xxx",
    "cnpj": "xxx",
    "email": "xxx",
    "telefone": "",
    "senha": ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se a Senha for vazio', async () => {

  customRequest.body = {
    "responsavel": "xxx",
    "empresa": "xxx",
    "cnpj": "xxx",
    "email": "xxx",
    "telefone": "xxx",
    "senha": ""
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o responsavel for muito curto.', async () => {

  customRequest.body = {
    "responsavel": "xxx",
    "empresa": "xxx",
    "cnpj": "xxx",
    "email": "xxx",
    "telefone": "xxx",
    "senha": "xxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o responsavel for muito grande.', async () => {

  customRequest.body = {
    "responsavel": "xxxxxxxx xxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxxxxxx",
    "empresa": "xxx",
    "cnpj": "xxx",
    "email": "xxx",
    "telefone": "xxx",
    "senha": "xxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se a Empresa for muito curto.', async () => {

  customRequest.body = {
    "responsavel": "xxxxx xxxxxx xxxxx",
    "empresa": "xxx",
    "cnpj": "xxx",
    "email": "xxx",
    "telefone": "xxx",
    "senha": "xxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se a Empresa for muito grande.', async () => {

  customRequest.body = {
    "responsavel": "xxxxx xxxxxx xxxxx",
    "empresa": "xxxxxxxx xxxxxxxxxx xxxxxxxxxxx xxxxxxxxxxxxxxxx",
    "cnpj": "xxx",
    "email": "xxx",
    "telefone": "xxx",
    "senha": "xxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o Email for invalido.', async () => {

  customRequest.body = {
    "responsavel": "xxxxx xxxxxx xxxxx",
    "empresa": "xxxxx xxxxxx xxxxx",
    "email": "xxx",
    "cnpj": "xxx",
    "telefone": "xxx",
    "senha": "xxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o CNPJ for invalido.', async () => {

  customRequest.body = {
    "responsavel": "xxxxx xxxxxx xxxxx",
    "empresa": "xxxxx xxxxxx xxxxx",
    "email": "xxxxxx@xxxx.xx.xx",
    "cnpj": "xxx",
    "telefone": "xxx",
    "senha": "xxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 400 se o CNPJ for invalido.', async () => {

  customRequest.body = {
    "responsavel": "xxxxx xxxxxx xxxxx",
    "empresa": "xxxxx xxxxxx xxxxx",
    "email": "xxxxxx@xxxx.xx.xx",
    "cnpj": "22548384000114",
    "telefone": "xxx",
    "senha": "xxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(400)
});

test('Deve retornar status 500 para criação da empresa.', async () => {

  customRequest.body = {
    "responsavel": "xxxxx xxxxxx xxxxx",
    "empresa": "xxxxx xxxxxx xxxxx",
    "email": "xxxxxx@xxxx.xx.xx",
    "cnpj": "22548384000114",
    "telefone": "1139723768",
    "senha": "xxxxxxx"
  }

  const httpResponse: typeCustomResponse = await endPoint.exec(customRequest)
  expect(httpResponse.statusCode).toBe(500)
  console.log(httpResponse)
});
