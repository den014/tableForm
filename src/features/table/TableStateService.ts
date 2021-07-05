import { nanoid } from 'nanoid'
import InitialStateService from '../../core/state/initialStateService'
import { ITable, ITableData, ITableEditData, ITableItem, ITableStateService, TableEnum } from './Table.types'

const initialTable = {
  id: '1',
  type: TableEnum.main,
  list: [
    {
      id: '1',
      name: 'Name',
      surname: 'Surname',
      age: 'Age',
      city: 'City',
    },
  ],
}

const serverResponseTime = 500

class TableStateService extends InitialStateService<ITableStateService> {
  constructor() {
    super({
      tables: [initialTable],
    })
  }

  addRow(data: ITableData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.state = {
          ...this.state,
          tables: this.state.tables.map((table) => {
            if (table.type === TableEnum.main) {
              return {
                ...table,
                list: [
                  ...table.list,
                  {
                    id: nanoid(),
                    ...data,
                  },
                ],
              }
            }
            return table
          }),
        }

        resolve('success')
      }, serverResponseTime)
    })
  }

  getRow(tableId: string, rowId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentTable = this.state.tables.find((table) => table.id === tableId)
        let data: ITableItem | null = null

        if (currentTable) {
          data = currentTable.list.find((row) => row.id === rowId) || null
        }

        resolve(data)
      }, serverResponseTime)
    })
  }

  deleteRow(tableId: string, rowId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.state = {
          ...this.state,
          tables: this.state.tables.map((table) => {
            if (table.id === tableId) {
              return {
                ...table,
                list: table.list.filter((row) => row.id !== rowId),
              }
            }

            return table
          }),
        }

        resolve('success')
      }, serverResponseTime)
    })
  }

  updateRow(tableId: string, rowId: string, data: ITableEditData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.state = {
          ...this.state,
          tables: this.state.tables.map((table) => {
            if (table.id === tableId) {
              return {
                ...table,
                list: table.list.map((row) => {
                  if (row.id === rowId) {
                    return {
                      ...row,
                      ...data,
                    }
                  }
                  return row
                }),
              }
            }
            return table
          }),
        }

        resolve('success')
      }, serverResponseTime)
    })
  }

  cloneTable(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let position: number = 0
        const tableMain: ITable = {
          ...(this.state.tables.find((table, index) => {
            if (table.id === id) {
              position = index
              return true
            }
            return false
          }) || this.state.tables[0]), // TODO: smell - something with find method, return type
        }

        tableMain.id = nanoid()
        tableMain.type = TableEnum.cloned
        this.state.tables.splice(position + 1, 0, tableMain)
        this.state = {
          ...this.state,
        }

        resolve('success')
      }, serverResponseTime)
    })
  }

  deleteTable(tableId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.state = {
          ...this.state,
          tables: this.state.tables.filter((table) => table.id !== tableId),
        }

        resolve('success')
      }, serverResponseTime)
    })
  }
}

export default new TableStateService()
