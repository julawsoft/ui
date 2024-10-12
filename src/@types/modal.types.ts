export interface ModalProps {
  onSave: (data?: any) => void
}
export interface EditModalProps extends ModalProps {
  dataToEdit: []
}
