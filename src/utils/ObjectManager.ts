import { MissingParam } from "./errors/custom/MissingParam"
import { UnexpectedParam } from "./errors/custom/UnexpectedParam"

export class ObjectManager {
  static hasKeys(requireds: Array<String>, object: Object, security: boolean = true) {
      if (security) {
        requireds.forEach((element: any) => {
          if (!(element in object)) {
            throw new MissingParam(element)
          }
        })

        for (const key in object) {
          if (!requireds.find((element) => element == key)) {
            delete object[key]
          }
        }
      } else {
        requireds.forEach((element: any) => {
          if (!(element in object)) {
            throw new MissingParam(element)
          }
        })
      }
  }
}