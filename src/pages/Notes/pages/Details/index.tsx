import { ArrowLeft } from 'phosphor-react'

import { HeaderWithNav } from '../../../../components/Navs/HeaderWithNavs'
import { CircleLink } from '../../../../components/Navs/CircleLink'
import { NavFloat } from '../../../../components/Navs/NavFloat'

import { useLocation } from 'react-router-dom'

import SpinnerProgress from '../../../../components/SpinnerProgress/index'
import { Flex, Text, Badge, Box } from '@chakra-ui/react'
import { useEffect } from 'react'

import { INotesList } from '../../../../schema/Notes'
import useAsyncState from '../../../../hooks/use-async-state'
import { ErrorLocal } from '../../../../components/ErrorLocal'
import { homeCardRequestInfoNotesById } from '../../../../services/Home/homeRequest'
import { DisplayDate } from '../../../RequestDetails/util'

export function DetailsNotes() {
  const location: any = useLocation()

  console.log(">>>>> localtion ", location)
  const {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
    message,
    setMessage,
  } = useAsyncState<INotesList>()

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await homeCardRequestInfoNotesById(
          Number(location.state.id),
        )
        setData(response.data)
      } catch (error) {
        setError(true)
        setMessage(String(error))
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  const handleReload = () => init()

  function printHTML(param: string) {
    return { __html: param }
  }

  const pathStaticFiles = import.meta.env.VITE_URL_STATIC_FILES + '/'

  return (
    <>
      <HeaderWithNav title={`Detalhes da Nota Informativa`}>
        <NavFloat side="left">
          <CircleLink
            href={location.state.back}
            icon={<ArrowLeft size={20} />}
            color="gray.200"
          />
        </NavFloat>
      </HeaderWithNav>

      <Flex
        width={'100%'}
        height={'100%'}
        position={'relative'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex width={'100%'} height={'100%'}>
          {error === true && !loading ? (
            <ErrorLocal message={message} reload={handleReload} />
          ) : loading ? (
            <>
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                width={'100%'}
              >
                <SpinnerProgress />
              </Flex>
            </>
          ) : (
            <>
              <Flex p={6} flexDirection={'column'} gap={4}>
                <Flex
                  flexDirection={'column'}
                  borderBottom={'1px solid #f2f2f2'}
                >
                  <Text fontSize={'2em'} fontFamily={'Roboto'}>
                    {data?.title}
                  </Text>
                  <Flex gap={2} alignItems={'center'} mb={1}>
                    <Text fontSize={12}>
                      Categoria:{' '}
                      <Badge colorScheme={'green'}> {String(data?.Tag.description)} </Badge>
                    </Text>{' '}
                    |
                    <Text fontSize={11}>
                      Data criada: {DisplayDate(String(data?.created_at))}
                    </Text>
                  </Flex>
                </Flex>
                <Flex>
                  <img
                    src={`${pathStaticFiles + '/' + data?.image}`}
                    alt={data?.title}
                  />
                </Flex>
                <Box mt={2} mb={10}>
                  <Text
                    dangerouslySetInnerHTML={printHTML(
                      String(data?.description),
                    )}
                    as={'p'}
                    fontSize={14}
                    mb={20}
                  ></Text>
                </Box>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </>
  )
}
