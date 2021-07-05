import React from 'react'
import { IInput } from './Input.types'

import './Input.scss'

const Input: React.FC<IInput> = (props: IInput) => {
  const { reference, placeholder, name, value = '', onChange, readOnly } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange({ name, value: event.target.value })
  }

  return (
    <input
      ref={reference}
      className="input"
      name={name}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      onChange={handleChange}
    />
  )
}

export default Input
