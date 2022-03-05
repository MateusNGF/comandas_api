import { ErrorCustom } from "../ErrorCustom";

export class BadRequestError extends ErrorCustom {
  constructor(msg: string) {
    super(msg)
    this.status = 400
    this.name = "BadRequestError"
  }
}