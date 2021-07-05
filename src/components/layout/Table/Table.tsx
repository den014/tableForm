import React from 'react'

import './Table.scss'
import Button from '../../tappable/Button/Button'
import { ITableComponent } from './Table.types'

const Table: React.FC<ITableComponent> = (props: ITableComponent) => {
  const { loading, columns, data, actions, className } = props

  let classNames = 'table'
  if (loading) classNames += ' loading'
  if (className) classNames += ` ${className}`

  return (
    <section className={classNames}>
      <table className="table-main" cellPadding={columns.length + 2}>
        <thead className="table-header">
          <tr className="table-row">
            {columns?.map((column) => (
              <th key={column} className="table-column">
                {column}
              </th>
            ))}

            {actions && <th className="table-column action"> </th>}
          </tr>
        </thead>
        <tbody className="table-group">
          {!data.list.length && (
            <tr className="table-row">
              <td className="table-column">No data</td>
            </tr>
          )}
          {data.list.map((row) => (
            <tr key={row.id} className="table-row">
              {columns?.map((column) => (
                <td key={column} className="table-column">
                  {/* @ts-ignore: TODO smell - figure type */}
                  {row[column.toLowerCase()]}
                </td>
              ))}

              {actions && (
                <td className="table-column">
                  <span className="table-column_action">
                    {actions.map((action) => {
                      const { label, event, ...buttonProps } = action
                      const handleClick = (): void => {
                        event(row.id)
                      }

                      return (
                        <Button key={label} {...buttonProps} onClick={handleClick}>
                          {label}
                        </Button>
                      )
                    })}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Table
