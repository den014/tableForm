import { IValidator } from './validator.types'

export const getValidator: IValidator = {
  isRequired: (value, text) => {
    if (value?.length) return null
    return text
  },
}
