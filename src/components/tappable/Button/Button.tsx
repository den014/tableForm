import React from 'react'
import { ButtonColorEnum, ButtonSizeEnum, ButtonVariantEnum, IButton } from './Button.types'
import Icon from '../../form/Icon/Icon'

import './Button.scss'

const Button: React.FC<IButton> = (props: IButton) => {
  const {
    children,
    color = ButtonColorEnum.primary,
    variant = ButtonVariantEnum.primary,
    size = ButtonSizeEnum.md,
    className,
    loading,
    icon,
    ...buttonProps
  } = props

  let classNames = `button ${variant} ${size} ${color}`
  if (className) classNames += ` ${className}`

  return (
    <button type="button" {...buttonProps} className={classNames}>
      {loading && 'loading'}
      {icon && <Icon icon={icon} />}
      {!loading && children}
    </button>
  )
}

export default Button
