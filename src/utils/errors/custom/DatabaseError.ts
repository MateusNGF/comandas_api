import { ErrorCustom } from "../ErrorCustom"

export class DatabaseError extends ErrorCustom {
  constructor(param?: string, mensagemCustom?: string) {
    if (mensagemCustom) {
      super(mensagemCustom)
    } else {
      super("Database text")
    }
    this.status = 400
    this.name = "DatabaseError"
  }
}