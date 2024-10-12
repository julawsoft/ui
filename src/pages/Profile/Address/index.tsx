import { useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { AddressDisplay } from './AddressDisplay'
import { AddressEdit } from './AddressEdit'

export interface AddressProps {
  street: string | undefined | null
  district: string | undefined | null
  city: string | undefined | null
  onToggleEditMode: () => void
}
export function Address({ city, district, street }: AddressProps) {
  const [isEditMode, setEditMode] = useState(false)
  const [copiedText, copy] = useCopyToClipboard()

  const onClick = () => {
    setEditMode(!isEditMode)
  }

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        // Display a togle when user copy sucessfully
      })
      .catch((error) => {
      })
  }

  const copyToclipboard = (value: string) => {
    handleCopy(value)
  }

  const onCopyToClipboard = () => {
    const result: string = '' + city ?? '' + district ?? '' + street ?? ''
    copyToclipboard(result)
  }

  return (
    <>
      {isEditMode ? (
        <AddressEdit
          onToggleEditMode={onClick}
          street={street}
          district={district}
          city={city}
        />
      ) : (
        <AddressDisplay
          onCopyToClipboard={onCopyToClipboard}
          onToggleEditMode={onClick}
          street={street}
          district={district}
          city={city}
        />
      )}
    </>
  )
}
