import { LanguageMessages } from 'joi'

interface Options {
  valid?: boolean
  unknown?: boolean
}

class JoiMessages {
  public general = (
    filedName: string,
    type = 'any',
    options?: Options,
  ): LanguageMessages => {
    const messages: LanguageMessages = {
      'any.required': `${filedName} can't be empty.`,
    }
    messages[`${type}.base`] = `${filedName} must be ${type}.`
    messages[`${type}.empty`] = `${filedName} can't be empty.`
    messages[`${type}.email`] = `${filedName} must be a valid email.`

    if (options?.valid) {
      messages[`any.only`] = `Must pass ${filedName.toLowerCase()} valid value.`
    }

    if (options?.unknown) {
      messages[
        `${type}.unknown`
      ] = `${filedName} contains invalid key ({{#label}}).`
    }

    if (type === 'number') {
      messages[
        `${type}.min`
      ] = `${filedName} must be greater than or equal to {{#limit}}.`
    }

    return messages
  }
}

export const JoiErrorMessages = new JoiMessages()
