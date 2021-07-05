import React from 'react'
import { IError } from './Error.types'

import './Error.scss'

const Error: React.FC<IError> = (props: IError) => {
  const { error } = props
  if (!error) return null

  return <p className="error">{error}</p>
}

export default Error
