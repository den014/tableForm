import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { getValidator } from '../../../core/validator/validator'
import { IField, IFieldRefAttributes } from './Field.types'
import Input from '../../../components/form/Input/Input'
import Error from '../../../components/typography/Error/Error'

import './Field.scss'

const Field: React.ForwardRefExoticComponent<React.PropsWithoutRef<IField> & React.RefAttributes<IFieldRefAttributes>> =
  forwardRef((props: IField, ref) => {
    const { className, name, value, placeholder, readOnly, validators, error, dirty } = props
    const inputReference = useRef(null)

    let classNames = 'field'
    if (className) classNames += ` ${className}`

    const validate = (val?: string): string | null => {
      if (validators) {
        const currentValue = val !== undefined ? val : value

        let err: string | null = null

        for (let i = 0; i < validators.length; i += 1) {
          const { key, text } = validators[i]
          const result: string | null = getValidator[key](currentValue, text)
          if (result) err = result
        }

        return err
      }

      return null
    }

    useEffect(() => {
      if (!dirty && validators) validate()
    }, [value])

    useImperativeHandle(ref, () => ({
      name,
      value: value || '',
      reference: inputReference,
      validate,
    }))

    return (
      <section className={classNames}>
        <Input reference={inputReference} name={name} value={value} placeholder={placeholder} readOnly={readOnly} />
        <Error error={error} />
      </section>
    )
  })

export default Field
