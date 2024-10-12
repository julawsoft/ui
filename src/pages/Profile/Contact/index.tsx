import { useState } from 'react'
import { ContactEdit } from './ContactEdit'
import { ContactDisplay } from './ContactDisplay'

export interface ContactProps {
  phoneNumber: string | undefined | null
  secPhoneNumber: string | undefined | null
  loginEmail: string | undefined | null
  personalEmail: string | undefined | null
  website: string | undefined | null
  x: string | undefined | null
  linkedin: string | undefined | null
  onToggleEditMode: () => void
}

export function Contact() {
  const [isEditMode, setEditMode] = useState(false)
  const onClick = () => {
    setEditMode(!isEditMode)
  }

  return (
    <>
      {isEditMode ? (
        <ContactEdit
          onToggleEditMode={onClick}
          phoneNumber={undefined}
          secPhoneNumber={undefined}
          loginEmail={undefined}
          personalEmail={undefined}
          website={undefined}
          x={undefined}
          linkedin={undefined}
        />
      ) : (
        <ContactDisplay
          onToggleEditMode={onClick}
          phoneNumber={undefined}
          secPhoneNumber={undefined}
          loginEmail={undefined}
          personalEmail={undefined}
          website={undefined}
          x={undefined}
          linkedin={undefined}
        />
      )}
    </>
  )
}
