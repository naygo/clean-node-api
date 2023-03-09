import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http.helper'
import type { Controller } from '../protocols/controller'
import type { EmailValidor } from '../protocols/email-validator'
import type { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidor

  constructor (emailValidator: EmailValidor) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
