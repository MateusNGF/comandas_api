import { BadRequest, DatabaseError, Email } from "../utils"
import { MissingParam } from "../utils/errors/custom/MissingParam"
import * as Validator from 'brazilian-values'
import { Cliente, Produto, Evento } from "./"
import { InvalidFormat } from "../utils/errors/custom/InvalidFormat"
import { props } from "../utils/configurations"
import textSchema from "../utils/configurations/textSchema"
import { ProdutoEstoque } from "./Produto"
import { CompanyRepository, ProdutoRepositorio } from "../repositorys"

export class Empresa {
  constructor(empresa : Empresa) {
    Object.assign(this, empresa)
    this.validar()
  }

  id?: string
  responsavel?: string
  nome: string
  cnpj?: string
  email: string
  senha?: string
  telefone?: string
  clientes?: Array<Cliente> = []
  eventos?: Array<Evento> = []
  produtos?: Array<ProdutoEstoque> = []
  criado_em?: string = new Date().toISOString()
  atualizado_em?: string = new Date().toISOString()

  validar() {
    for (const key in this) { if (!this[key]) throw new MissingParam(key) }
    for (const key in this) {
      if (props.entities.company[key.toString()]) {
        if (this[key.toString()].length < props.entities.company[key.toString()].text.min) {
          throw new InvalidFormat(key, textSchema.ptbr.controllers.company.validation.minLenght(key.toString())) 
        } else if (this[key.toString()].length > props.entities.company[key.toString()].text.max) {
          throw new InvalidFormat(key, textSchema.ptbr.controllers.company.validation.maxLenght(key.toString())) 
        }
      }
    }

    Email.isValid(this.email)
    if (!Validator.isCNPJ(this.cnpj)) throw new InvalidFormat('CNPJ')
    if (!Validator.isPhone(this.telefone)) throw new InvalidFormat("Telefone")
    return true
  }

  public pegarEvento(eventId: string): Evento {
    if (!this.eventos) throw new BadRequest(`${this.nome} não realizou nenhum evento ainda.`)
    let Evento: Evento = this.eventos.find(e => e.id === eventId)
    if (!Evento) throw new BadRequest("O evento não foi encontrado.")
    else return Evento
  }

  public pegarProduto(productId: string) {
    if (!this.produtos) throw new BadRequest("Nenhum produto cadastrado.")
    let produto: ProdutoEstoque = this.produtos?.find(p => p.id === productId)
    if (!produto) throw new BadRequest("Esse produto não existe no seu estoque.")
    return produto
  }

  public async adicionarProduto(produtoEstoque: ProdutoEstoque) {
    let produtoRegistrado = this.existeEsseProduto(null, produtoEstoque.nome)
    if (produtoRegistrado) {
      produtoRegistrado.estoque += produtoEstoque.estoque
      await this.atualizarProduto(produtoRegistrado)
    } else {
      if (!await ProdutoRepositorio.adicionar(this.id, produtoEstoque)) {
        throw new DatabaseError(`Não foi possivel criar o produto ${produtoEstoque.nome}.`)
      }
    }
    return true
  }

  public existeEsseProduto(produtoID?: string, produtoNome?: string) {
    let byId = this.produtos.find(produtoEstoque => produtoEstoque.id === produtoID)
    if (byId) return byId

    let byNome = this.produtos.find(produtoEstoque => (produtoEstoque.nome === produtoNome))
    if (byNome) return byNome
  }

  public async atualizarProduto(produto: ProdutoEstoque) {
    let index = this.produtos.indexOf(this.produtos.find(c => c.id === produto.id))
    this.produtos[index] = produto
    await ProdutoRepositorio.atualizar(this.id, produto)
  }


}