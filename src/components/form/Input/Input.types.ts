import { RefObject } from 'react'

export interface IInput {
  reference: RefObject<HTMLInputElement>
  name: string
  placeholder: string
  value?: string
  onChange?: (value: { name: string; value: string }) => void
  readOnly?: boolean
}

export interface IInputChangeEvent {
  name: string
  value: string
  error: string | null
}
