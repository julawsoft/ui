import { Button, Flex, Text } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import { Select } from '../../../components/Forms/Select'
import { convertDataToSelect } from '../../../utils/convertDataToSelect'
import { RequestType } from '../../../components/RequestForm'
import { requestTypesService } from '../../../services/Home/requestType'
import { IRequestType } from '../../../schema/HomeCard'
import { DepartmentService } from '../../../services/Organograma/DepartmentService'
import { IDepartment } from '../../../schema/Department'

interface ICardGlobal {
  children: ReactNode
  showAll: boolean
  setShowAll: (show: boolean) => void
  setRequestTypeSelected: (value: number) => void
  setDepartamentSelected: (value: number) => void
}

export function CardGlobal({
  children,
  showAll,
  setShowAll,
  setRequestTypeSelected,
  setDepartamentSelected,
}: ICardGlobal) {
  const [requestType, setRequestType] = useState<RequestType[]>([])
  const [departmants, setDepartaments] = useState<IDepartment[]>([])

  useEffect(() => {
    setTimeout(async () => {
      const response = await requestTypesService()
      setRequestType(response as IRequestType[])
      const departament = await DepartmentService.getAll()
      setDepartaments(departament)
    }, 1000)
  }, [])

  const handleChangeSelectDepartament = (value) => {
    setDepartamentSelected(value)
  }
  const handleChangeSelectRequest = (value) => {
    setRequestTypeSelected(value)
  }

  return (
    <>
      <Flex>
        <Flex justifyContent={'space-between'} flex={'1'} alignItems={'center'}>
          <Flex gap={2}>
            <Button
              bgColor={showAll ? 'gray.300' : '#C2912E'}
              color={'#ffffff'}
              size="sm"
              borderColor={'#C2912E'}
              _hover={{
                bg: '#1d212a',
                color: '#fff',
              }}
              onClick={() => setShowAll(false)}
            >
              Pendentes
            </Button>
            <Button
              bgColor={showAll ? '#C2912E' : 'gray.300'}
              color={'#ffffff'}
              borderColor={'#C2912E'}
              size="sm"
              _hover={{
                bg: '#1d212a',
              }}
              onClick={() => setShowAll(true)}
            >
              Todas
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width={'100%'}
        minHeight={'250px'}
        justifyContent={'center'}
        alignItems={'start'}
      >
        {children}
      </Flex>
    </>
  )
}
