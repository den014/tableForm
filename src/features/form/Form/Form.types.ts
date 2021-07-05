import React, { Dispatch, RefObject, SetStateAction } from 'react'
import { IFieldRefAttributes, IFieldState } from '../Field/Field.types'

export interface IForm {
  className?: string
  references: RefObject<IFieldRefAttributes>[]
  model: [IFormModel, Dispatch<SetStateAction<IFormModel>>]
  children: React.ReactNode
  onSubmit?: () => void
}

export interface IFormModel {
  // TODO: smell - add generic type for data
  data: { [key: string]: string }
  state: { [key: string]: IFieldState }
  errors: boolean
  dirty: boolean
}

export interface IFormRefAttributes {
  resetForm: () => void
}
