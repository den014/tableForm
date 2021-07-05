import React, { RefObject } from 'react'

export interface IFieldRefAttributes {
  name: string
  value: string
  reference: RefObject<HTMLInputElement>
  validate: (value?: string) => string | null
}

export interface IField {
  ref: React.RefObject<IFieldRefAttributes>
  className?: string
  name: string
  placeholder: string
  value?: string
  readOnly?: boolean
  dirty?: boolean
  error?: string | null
  validators?: { key: string; text: string }[]
}

export interface IFieldState {
  error: string | null
  dirty: boolean
}
