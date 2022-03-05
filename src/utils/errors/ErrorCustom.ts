export abstract class ErrorCustom extends Error {
  public custom: boolean = true
  public status: number
}