import textSchema from "../../configurations/textSchema";
import { ErrorCustom } from "../ErrorCustom";

export class InvalidFormat extends ErrorCustom {
  constructor(param: string, mensagemCustom?: string) {
    if (mensagemCustom) {
      super(mensagemCustom)
    } else {
      super(textSchema.ptbr.errors.invalidFormat(param))
    }
    this.status = 400
    this.name = "InvalidFormatError"
  }
}