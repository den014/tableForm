export interface ICheckbox {
  id: string
  name: string
  label?: string
  value?: string
  checked: boolean
  onChange: () => void
}
