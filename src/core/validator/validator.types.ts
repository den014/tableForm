export interface IValidator {
  [key: string]: (value: string | undefined, text: string) => string | null
}
