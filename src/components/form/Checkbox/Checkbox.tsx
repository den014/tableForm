import React from 'react'
import { ICheckbox } from './Checkbox.types'

import './Checkbox.scss'

const Checkbox: React.FC<ICheckbox> = (props: ICheckbox) => {
  const { id, name, label, checked, value, onChange } = props

  return (
    <span className="checkbox">
      <input
        className="checkbox-input"
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {label && (
        <label className="checkbox-label" htmlFor={id}>
          {label}
        </label>
      )}
    </span>
  )
}

export default Checkbox
