import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Dialog from '../../../components/layout/Dialog/Dialog'
import Form from '../../../features/form/Form/Form'
import { IFormRefAttributes } from '../../../features/form/Form/Form.types'
import { tableSchema } from '../../../features/table/Table.schema'
import { IFieldRefAttributes } from '../../../features/form/Field/Field.types'
import { initialFormState } from '../../../features/form/Form/Form.helpers'
import Field from '../../../features/form/Field/Field'
import Button from '../../../components/tappable/Button/Button'
import TableStateService from '../../../features/table/TableStateService'
import { ITableEditData } from '../../../features/table/Table.types'

import './DialogEdit.scss'
import Checkbox from '../../../components/form/Checkbox/Checkbox'

const DialogEdit: React.FC = () => {
  const history = useHistory()
  const { search } = useLocation()
  const [visibility, setVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agree, setAgree] = useState(false)
  const [init, setInit] = useState(false)
  const fieldsModel = useState(initialFormState)
  const formReference = useRef<IFormRefAttributes>(null)
  const urlParams = new URLSearchParams(search)
  const editQuery = urlParams.get('edit') || ''
  const [fields, setFields] = fieldsModel
  const editableFields = tableSchema.filter((item) => item.editable)
  const fieldsReference = editableFields.map(() => useRef<IFieldRefAttributes>(null))

  useEffect(() => {
    if (editQuery && !visibility) {
      setInit(false)
      setVisibility(true)

      const [tableId, rowId] = editQuery.split(',')

      TableStateService.getRow(tableId, rowId)
        .then((rowData) => {
          // TODO: smell - if rowData === null, show description
          if (rowData) {
            const updatedData = { ...fields }

            editableFields.forEach(({ key }) => {
              // @ts-ignore TODO: add generic type for IFormModel -> data
              updatedData.data[key] = rowData[key]
            })

            setFields(updatedData)
          }

          console.log('row get resolve')
        })
        .catch(() => {
          console.log('row get reject')
        })
        .finally(() => {
          setInit(true)
        })
    } else if (!editQuery && visibility) {
      setVisibility(false)
      formReference.current?.resetForm()
    }
  }, [editQuery])

  const handleClose = (): void => {
    if (editQuery) {
      setAgree(false)
      urlParams.delete('edit')
      history.replace({
        search: urlParams.toString(),
      })
    }
  }

  const handleSubmit = (): void => {
    setLoading(true)
    const [tableId, rowId] = editQuery.split(',')
    // @ts-ignore TODO: add generic type for IFormModel -> data
    const rowData: ITableEditData = fields.data
    TableStateService.updateRow(tableId, rowId, rowData)
      .then(() => {
        handleClose()
        console.log('row update resolve')
      })
      .catch(() => {
        console.log('row update reject')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChangeAgree = (): void => {
    setAgree(!agree)
  }

  return (
    <Dialog title="Edit name" visibility={visibility} onClose={handleClose}>
      {!init && <p>getting data...</p>}
      {init && (
        <Form
          className="dialog-edit"
          ref={formReference}
          references={fieldsReference}
          model={fieldsModel}
          onSubmit={handleSubmit}
        >
          {editableFields.map((schema, index) => (
            <Field
              className="dialog-edit_field"
              ref={fieldsReference[index]}
              key={schema.key}
              name={schema.key}
              value={fields.data?.[schema.key]}
              error={fields.state?.[schema.key]?.error}
              dirty={fields.state?.[schema.key]?.dirty}
              placeholder={schema.label}
              validators={schema.validators}
              readOnly={loading}
            />
          ))}

          <Checkbox
            id="confirm"
            name="checkbox-confirm"
            label="Totally agree"
            onChange={handleChangeAgree}
            checked={agree}
          />

          <Button
            className="dialog-edit_submit"
            type="submit"
            disabled={fields.dirty || fields.errors || loading || !agree}
            loading={loading}
          >
            SAVE
          </Button>
        </Form>
      )}
    </Dialog>
  )
}

export default DialogEdit
