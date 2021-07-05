export enum TableEnum {
  main,
  cloned,
}

export interface ITableSchemaItem {
  key: string
  label: string
  validators: { key: string; text: string }[]
  editable?: boolean
}

export interface ITableItem {
  id: string
  name: string
  age: string
  city: string
}

export interface ITableData {
  name: string
  surname: string
  age: string
  city: string
}

export interface ITableEditData {
  name: string
  surname: string
  city: string
}

export interface ITable {
  id: string
  type: TableEnum
  list: ITableItem[]
}

export interface ITableStateService {
  tables: ITable[]
}
