import React from 'react'
import { ReactSVG } from 'react-svg'
import { IIcon } from './Icon.types'

import './Icon.scss'

const Icon: React.FC<IIcon> = (props: IIcon) => {
  const { icon } = props

  const iconSVG = require(`../../../assets/icons/${icon}.svg`)

  return <ReactSVG src={iconSVG?.default} />
}

export default Icon
