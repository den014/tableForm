import { ITableSchemaItem } from './Table.types'

export const tableSchema: ITableSchemaItem[] = [
  {
    key: 'name',
    label: 'Name',
    validators: [{ key: 'isRequired', text: 'This field is required' }],
    editable: true,
  },
  {
    key: 'surname',
    label: 'Surname',
    validators: [{ key: 'isRequired', text: 'This field is required' }],
    editable: true,
  },
  {
    key: 'age',
    label: 'Age',
    validators: [{ key: 'isRequired', text: 'This field is required' }],
  },
  {
    key: 'city',
    label: 'City',
    validators: [{ key: 'isRequired', text: 'This field is required' }],
    editable: true,
  },
]
