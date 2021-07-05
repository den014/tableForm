import React from 'react'
import Portal from '../Portal/Portal'
import Button from '../../tappable/Button/Button'
import { ButtonColorEnum, ButtonSizeEnum, ButtonVariantEnum } from '../../tappable/Button/Button.types'
import { IDialog } from './Dialog.types'

import './Dialog.scss'

const Dialog: React.FC<IDialog> = (props: IDialog) => {
  const { children, title, onClose, visibility } = props

  if (!visibility) return null

  return (
    <Portal>
      <>
        <aside className="overlay" />
        <aside className="dialog">
          <header className="dialog-header">
            <h4 className="dialog-header_title">{title}</h4>
            <Button
              icon="delete"
              variant={ButtonVariantEnum.transparent}
              size={ButtonSizeEnum.sm}
              color={ButtonColorEnum.light}
              onClick={onClose}
            />
          </header>
          <section className="dialog-content">{children}</section>
        </aside>
      </>
    </Portal>
  )
}

export default Dialog
