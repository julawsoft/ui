import { useState } from 'react'
import { StartDateDisplay } from './StartDateDisplay'
import { StartDateEdit } from './StartDateEdit'

export interface StartDateProps {
  startDate: Date
  onToggleEditMode: () => void
}

export function StartDate() {
  const [isEditMode, setEditMode] = useState(false)

  const onClick = () => {
    setEditMode(!isEditMode)
  }

  return (
    <>
      {isEditMode ? (
        <StartDateEdit
          startDate={new Date('10-10-2022')}
          onToggleEditMode={onClick}
        />
      ) : (
        <StartDateDisplay
          startDate={new Date('10-10-2022')}
          onToggleEditMode={onClick}
        />
      )}
    </>
  )
}
