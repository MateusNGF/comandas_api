import { InvalidFormat } from "./errors/custom/InvalidFormat";

export class Email {

  static regexEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  static isValid(email: string): boolean {
    if (!this.regexEmail.test(email)) throw new InvalidFormat('Email') 
    else return true
  }
}