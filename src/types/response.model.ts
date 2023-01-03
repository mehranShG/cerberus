export class ResponseModel {
  success: boolean
  result: any
  code: number
  constructor(success, result, code) {
    this.success = success
    this.result = result
    this.code = code
  }
}
