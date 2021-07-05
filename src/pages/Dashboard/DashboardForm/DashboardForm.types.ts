import { Dispatch, RefObject, SetStateAction } from 'react'
import { IFormModel, IFormRefAttributes } from '../../../features/form/Form/Form.types'

export interface IDashboardForm {
  reference?: RefObject<IFormRefAttributes>
  fieldsModel: [IFormModel, Dispatch<SetStateAction<IFormModel>>]
  onChange?: (value: string) => void
  onSubmit?: () => void
  vertical?: boolean
  loading?: boolean
  errors?: boolean
}
