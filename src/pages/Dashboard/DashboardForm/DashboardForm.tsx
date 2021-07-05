import React, { useRef } from 'react'
import Field from '../../../features/form/Field/Field'
import Button from '../../../components/tappable/Button/Button'
import { IDashboardForm } from './DashboardForm.types'
import { tableSchema } from '../../../features/table/Table.schema'
import { IFieldRefAttributes } from '../../../features/form/Field/Field.types'
import Form from '../../../features/form/Form/Form'

import './DashboardForm.scss'

const DashboardForm: React.FC<IDashboardForm> = (props: IDashboardForm) => {
  const { fieldsModel, onSubmit, loading, vertical, reference } = props
  const [fields] = fieldsModel
  const fieldsReference = tableSchema.map(() => useRef<IFieldRefAttributes>(null))

  let classNames = 'dashboard-form'
  if (vertical) classNames += ' vertical'

  return (
    <Form className={classNames} ref={reference} references={fieldsReference} model={fieldsModel} onSubmit={onSubmit}>
      <div className="dashboard-form_fields">
        {tableSchema.map((schema, index) => (
          <Field
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
      </div>

      <Button
        type="submit"
        className="dashboard-form_submit"
        disabled={fields.dirty || fields.errors || loading}
        loading={loading}
      >
        ADD
      </Button>
    </Form>
  )
}

export default DashboardForm
