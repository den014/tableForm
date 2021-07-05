import React from 'react'

export interface IDialog {
  children: React.ReactNode
  title: string
  onClose: () => void
  visibility: boolean
}
