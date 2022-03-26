import { ErrorCustom } from "../ErrorCustom"

export class DatabaseError extends ErrorCustom {
  constructor(mensagemCustom?: string) {
    super(mensagemCustom)
    
    this.status = 400
    this.name = "DatabaseError"
  }
}