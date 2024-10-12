import { useState } from 'react'
import { BasicInformationDisplay } from './BasicInformationDisplay'
import { BasicInformationEdit } from './BasicInformationEdit'

export interface BasicInformationProps {
  prefName: string | undefined | null
  firstName: string | undefined | null
  lastName: string | undefined | null
  nationality: string | undefined | null
  birthDate: Date | undefined | null
  gender: string | undefined | null
  onToggleEditMode: () => void
}

export function BasicInformation() {
  const [isEditMode, setEditMode] = useState(false)
  const onClick = () => {
    setEditMode(!isEditMode)
  }

  return (
    <>
      {isEditMode ? (
        <BasicInformationEdit
          onToggleEditMode={onClick}
          prefName={undefined}
          firstName={undefined}
          lastName={undefined}
          nationality={undefined}
          birthDate={undefined}
          gender={undefined}
        />
      ) : (
        <BasicInformationDisplay
          onToggleEditMode={onClick}
          prefName={undefined}
          firstName={undefined}
          lastName={undefined}
          nationality={undefined}
          birthDate={undefined}
          gender={undefined}
        />
      )}
    </>
  )
}
