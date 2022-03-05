import { ErrorCustom } from "../ErrorCustom";

export class UnauthorizedError extends ErrorCustom {
  constructor(msg: string) {
    super(msg)
    this.status = 401
    this.name = "UnauthorizedError"
  }
}