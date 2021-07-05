import React from 'react'

export enum ButtonVariantEnum {
  primary = 'variant-basic',
  link = 'variant-link',
  transparent = 'variant-transparent',
}

export enum ButtonSizeEnum {
  sm = 'size-sm',
  md = 'size-md',
}

export enum ButtonColorEnum {
  primary = 'color-primary',
  warning = 'color-warning',
  light = 'color-light',
}

export interface IButton {
  children?: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  size?: ButtonSizeEnum
  variant?: ButtonVariantEnum
  color?: ButtonColorEnum
  icon?: string
  className?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}
