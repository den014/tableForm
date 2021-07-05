import React, { useRef, useState } from 'react'
import DashboardForm from '../DashboardForm/DashboardForm'
import { initialFormState } from '../../../features/form/Form/Form.helpers'
import { IFormRefAttributes } from '../../../features/form/Form/Form.types'
import TableStateService from '../../../features/table/TableStateService'

import './DashboardForms.scss'

const DashboardForms: React.FC = () => {
  const fields = useState(initialFormState)
  const [loading, setLoading] = useState<boolean>(false)
  const dashboardPrimaryReference = useRef<IFormRefAttributes>(null)

  const handleSubmit = (): void => {
    setLoading(true)
    // @ts-ignore TODO: add generic type for IFormModel -> data
    TableStateService.addRow(fields[0].data)
      .then(() => {
        dashboardPrimaryReference.current?.resetForm()
        console.log('row add resolve')
      })
      .catch(() => {
        console.log('row add reject')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <section className="dashboard-forms">
      <DashboardForm
        reference={dashboardPrimaryReference}
        fieldsModel={fields}
        onSubmit={handleSubmit}
        loading={loading}
      />
      <DashboardForm fieldsModel={fields} onSubmit={handleSubmit} loading={loading} vertical />
    </section>
  )
}

export default DashboardForms
