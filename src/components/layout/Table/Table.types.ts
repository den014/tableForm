import { ITable } from '../../../features/table/Table.types'
import { IButton } from '../../tappable/Button/Button.types'

export interface ITableComponent {
  loading?: boolean
  columns: string[]
  data: ITable
  actions: IAction[]
  className?: string
}

interface IAction extends IButton {
  label: string
  event: (id: string) => void
}
