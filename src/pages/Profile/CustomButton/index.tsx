import { Button, Text } from '@chakra-ui/react'
import React from 'react'
export interface CustomButtonProps {
  title: string
  icon?: React.ReactElement
  onClick: () => void
}
const CustomButton = ({ title, icon, onClick }: CustomButtonProps) => {
  return (
    <Button
      w={'250px'}
      px={4}
      m={0}
      leftIcon={icon}
      color={'#C2912E'}
      bg={'#D9D9D9'}
      onClick={onClick}
      borderTopRightRadius={'30px'}
      borderBottomRightRadius={'30px'}
    >
      <Text fontSize={18} fontStyle={'inherit'} whiteSpace="nowrap">
        {title}
      </Text>
    </Button>
  )
}

export default CustomButton
