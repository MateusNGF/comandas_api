import textSchema from "../../configurations/textSchema";
import { ErrorCustom } from "../ErrorCustom";

export class UnexpectedParam extends ErrorCustom {
  constructor(param: string) {
    super(textSchema.ptbr.errors.unexpectedParam(param))
    this.status = 400
    this.name = "unexpectedParamError"
  }
}