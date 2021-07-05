import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Table from '../../../components/layout/Table/Table'
import { tableSchema } from '../../../features/table/Table.schema'
import useObservable from '../../../core/state/useObservable'
import TableStateService from '../../../features/table/TableStateService'
import Button from '../../../components/tappable/Button/Button'
import { ButtonColorEnum, ButtonSizeEnum, ButtonVariantEnum } from '../../../components/tappable/Button/Button.types'
import { TableEnum } from '../../../features/table/Table.types'

import './DashboardTable.scss'

const DashboardTable: React.FC = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const { tables } = useObservable(TableStateService)
  const columns: string[] = tableSchema.map(({ label }) => label)

  return (
    <section className="dashboard-tables">
      {tables.map((data) => {
        const handleClone = (): void => {
          setLoading(true)

          TableStateService.cloneTable(data.id)
            .then(() => {
              console.log('table clone resolve')
            })
            .catch(() => {
              console.log('table clone reject')
            })
            .finally(() => {
              setLoading(false)
            })
        }

        const handleEditRow = (id: string) => {
          history.replace({
            pathname: '/',
            search: `?edit=${data.id},${id}`,
          })
        }

        const handleDeleteRow = (id: string) => {
          setLoading(true)

          TableStateService.deleteRow(data.id, id)
            .then(() => {
              console.log('row delete resolve')
            })
            .catch(() => {
              console.log('row delete reject')
            })
            .finally(() => {
              setLoading(false)
            })
        }

        const handleDeleteTable = (): void => {
          setLoading(true)

          TableStateService.deleteTable(data.id)
            .then(() => {
              console.log('table delete resolve')
            })
            .catch(() => {
              console.log('table delete reject')
            })
            .finally(() => {
              setLoading(false)
            })
        }

        return (
          <section key={data.id} className="dashboard-tables-table">
            <div className="dashboard-tables-control">
              <Button onClick={handleClone} size={ButtonSizeEnum.sm} disabled={loading}>
                Copy table
              </Button>
              <Button
                icon="delete"
                onClick={handleDeleteTable}
                size={ButtonSizeEnum.sm}
                variant={ButtonVariantEnum.transparent}
                color={ButtonColorEnum.warning}
                disabled={data.type === TableEnum.main || loading}
              />
            </div>
            <Table
              loading={loading}
              key={data.id}
              columns={columns}
              data={data}
              actions={[
                {
                  label: 'Edit',
                  variant: ButtonVariantEnum.link,
                  size: ButtonSizeEnum.sm,
                  event: handleEditRow,
                },
                {
                  label: 'Delete',
                  color: ButtonColorEnum.warning,
                  variant: ButtonVariantEnum.link,
                  size: ButtonSizeEnum.sm,
                  event: handleDeleteRow,
                },
              ]}
            />
          </section>
        )
      })}
    </section>
  )
}

export default DashboardTable
