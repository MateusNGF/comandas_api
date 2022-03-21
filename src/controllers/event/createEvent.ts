import { Evento } from "../../entities";
import { EventRepository } from "../../repositorys";
import { BadRequest, IController, Messenger, ObjectManager, typeCustomRequest, typeCustomResponse } from "../../utils";
import { props } from "../../utils/configurations";
import text_schema from "../../utils/configurations/textSchema";
const textConfigs = text_schema.ptbr.controllers.event.create

export class createEvent implements IController {
  async exec(request: typeCustomRequest): Promise<typeCustomResponse> {
    try {
      const realizador = request.header.company.id

      ObjectManager.hasKeys(["nome", "maximo_saldo", "data_inicio", "data_fim"], request.body)
      
    // verificar se a empresa existe

      const evento: Evento = new Evento(request.body)
   
      evento.data_inicio = new Date(request.body.data_inicio).toISOString()
      evento.data_fim = new Date(request.body.data_fim).toISOString()

      if (evento.data_inicio > evento.data_fim) {
        throw new BadRequest(textConfigs.dateInvalid)
      }
      
      evento.realizador = realizador
      evento.criado_em = new Date().toISOString()
      evento.arquivado = false

      evento.maximo_saldo = (request.body.maximo_saldo >= props.entities.evento.defaultMaximoSaldo)
        ? request.body.maximo_saldo
        : props.entities.evento.defaultMaximoSaldo


      const databaseResult = await EventRepository.create(evento)
      if (!databaseResult.insertedId) {throw new BadRequest(textConfigs.insertFailed)}
      
      return Messenger.success({ id: databaseResult.insertedId })
    } catch (erro) {
      return Messenger.error(erro)
    }
  } 
}