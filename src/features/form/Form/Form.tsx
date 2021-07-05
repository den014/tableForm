import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { IForm, IFormModel, IFormRefAttributes } from './Form.types'
import { IInputChangeEvent } from '../../../components/form/Input/Input.types'
import { initialFormState } from './Form.helpers'

import './Form.scss'

const Form: React.ForwardRefExoticComponent<React.PropsWithoutRef<IForm> & React.RefAttributes<IFormRefAttributes>> =
  forwardRef((props: IForm, ref) => {
    const { children, className, onSubmit, references, model } = props
    const [fields, setFields] = model

    let classNames = 'form'
    if (className) classNames += ` ${className}`

    useEffect(() => {
      let inputEventList: { (event: Event): void }[] = []

      references.forEach((fieldRef) => {
        const { name, reference, validate } = fieldRef.current || {}
        const handleInput = (event: Event) => {
          // TODO: smell - looks like hack: https://www.designcise.com/web/tutorial/how-to-fix-property-does-not-exist-on-type-eventtarget-typescript-error
          const { value } = event.target as HTMLInputElement
          const error = validate ? validate(value) : null
          handleChange({ name: name || '', value, error })
        }
        inputEventList.push(handleInput)
        reference?.current?.addEventListener('input', handleInput)
      })

      return () => {
        references.forEach((fieldRef, index) => {
          const { reference } = fieldRef.current || {}
          reference?.current?.removeEventListener('input', inputEventList[index])
        })

        inputEventList = []
      }
    }, [fields])

    const handleChange = (data: IInputChangeEvent) => {
      const errors = !!Object.keys(fields.state).find(
        (key) => (fields.state[key]?.error && key !== data.name) || data.error
      )

      setFields({
        data: {
          ...fields.data,
          [data.name]: data.value,
        },
        state: {
          ...fields.state,
          [data.name]: {
            error: data.error,
            dirty: false,
          },
        },
        dirty: false,
        errors,
      })
    }

    useImperativeHandle(ref, () => ({
      resetForm,
    }))

    const resetForm = (): void => {
      const initialFields: IFormModel = initialFormState

      references.forEach((fieldRef) => {
        const { name = '' } = fieldRef.current || {}

        initialFields.data = {
          ...initialFields.data,
          [name]: '',
        }
        initialFields.state = {
          ...initialFields.state,
          [name]: {
            error: null,
            dirty: true,
          },
        }
      })

      setFields(initialFields)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      let hasError: boolean = false
      const validateResults: IFormModel = { data: {}, state: {}, errors: false, dirty: false }

      references.forEach((fieldRef) => {
        const { name = '', value = '', validate } = fieldRef.current || {}
        const error = validate ? validate() : null

        validateResults.data = {
          ...validateResults.data,
          [name]: value,
        }
        validateResults.state = {
          ...validateResults.state,
          [name]: {
            error,
            dirty: false,
          },
        }

        if (validate && error) hasError = true
      })

      if (hasError) validateResults.errors = true

      setFields(validateResults)

      if (onSubmit && !hasError) {
        onSubmit()
        references[0].current?.reference.current?.focus()
      }
    }

    return (
      <form className={classNames} onSubmit={handleSubmit}>
        {children}
      </form>
    )
  })

export default Form
