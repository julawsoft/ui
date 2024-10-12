import { useState } from 'react'
import { VisaExiryDateEdit } from './VisaExiryDateEdit'
import { VisaExiryDateDisplay } from './VisaExiryDateDisplay'

export interface VisaExpiryDateProps {
  expiryDate: Date
  onToggleEditMode: () => void
}
export function VisaExpiryDate() {
  const [isEditMode, setEditMode] = useState(false)

  const onClick = () => {
    setEditMode(!isEditMode)
  }
  return (
    <>
      {' '}
      {isEditMode ? (
        <VisaExiryDateEdit
          expiryDate={new Date('10-10-2022')}
          onToggleEditMode={onClick}
        />
      ) : (
        <VisaExiryDateDisplay
          expiryDate={new Date('10-10-2022')}
          onToggleEditMode={onClick}
        />
      )}
    </>
  )
}

export interface StartDateProps {
  startDate: Date
  onToggleEditMode: () => void
}
