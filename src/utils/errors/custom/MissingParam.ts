import textSchema from "../../aplication_config/textSchema";
import { ErrorCustom } from "../ErrorCustom";

export class MissingParam extends ErrorCustom {
  constructor(param: string) {
    super(textSchema.ptbr.errors.missingParam(param))
    this.status = 400
    this.name = "MissingParamError"
  }
}