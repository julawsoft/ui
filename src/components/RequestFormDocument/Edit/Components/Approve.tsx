import {
  Flex,
  Box,
  Text,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Badge,
  Textarea,
} from '@chakra-ui/react'
import { IHomeCardRequestById } from '../../../../schema/HomeCard'
import { PaperclipHorizontal } from 'phosphor-react'
import { ENUN_REQUEST } from '../../../../pages/Home/utils'
import { translate } from '../../../../utils/language/pt'

interface IFormApprove {
  data: IHomeCardRequestById | undefined
  handleViewAnexoSelected: () => void
  isOpenModalFeedback: boolean
  feedBackReject: string
  setFeedbBackReject: any
}

export function RequestFormApprove({
  data,
  handleViewAnexoSelected,
  isOpenModalFeedback,
  feedBackReject,
  setFeedbBackReject,
}: IFormApprove) {
  return (
    <>
      <Flex
        p={2}
        gap={3}
        alignItems={'center'}
        bgColor={'#f2f2f2'}
        color={'colab.sidebar'}
      >
        <Avatar size="md" name={data?.Employee.name} src={''}></Avatar>
        <Flex flexDirection={'column'}>
          <Text fontSize={'14px'} fontWeight={'medium'}>
            {data?.Employee.name}
          </Text>
          <Text fontSize={'12px'}>
            {data?.Employee.Contract[0] &&
            data?.Employee.Contract[0].Role.description
              ? data?.Employee.Contract[0].Role.description
              : 'Neunhuma função'}
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection={'column'}
        p={2}
        border={'1px solid #f2f2f2'}
        bgColor={'#f2f2f2'}
      >
        <Flex gap={2} flexDirection={'column'}>
          <Flex flexDirection={'column'}>
            <Text fontWeight={'semibold'}>Tipo de Solicitação</Text>
            <Text bgColor={'#f2f2f2'}>{data?.ReasonAbsence.description}</Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text fontWeight={'semibold'}>Duração</Text>
            <Text bgColor={'#f2f2f2'}>
              {`${new Date(String(data?.date_start))
                .toLocaleString()
                .substring(0, 10)}
           - ${new Date(String(data?.date_end))
             .toLocaleString()
             .substring(0, 10)}`}
              <Box>{data?.number_of_days} dia(s)</Box>
              <Box>{data?.AbsencePeriod[0].text}</Box>
            </Text>
          </Flex>
          <Flex flexDirection={'column'}>
            <Text fontWeight={'semibold'}>Nota</Text>
            <Text bgColor={'#f2f2f2'}>
              {data?.notes ?? 'Nenhuma nota adicionada...'}
            </Text>
          </Flex>
        </Flex>
        <Box mt={2}>
          <Flex alignItems={'center'} gap={2}>
            <Text>Anexo</Text>
            <PaperclipHorizontal size={22} />
          </Flex>
          {data?.attach ? (
            <>
              <Flex
                gap={2}
                alignItems={'center'}
                title="Visualizar anexo"
                onClick={handleViewAnexoSelected}
                cursor={'pointer'}
              >
                <Text color={'#C2912E'}>{data?.attach}</Text>
              </Flex>
            </>
          ) : (
            <>
              <Text fontSize={10} fontWeight={'regular'}>
                Nenhum anexo!
              </Text>
            </>
          )}
        </Box>
      </Flex>
      {data?.ReasonAbsence.is_manager_required || data?.status_manager ? (
        <Accordion allowToggle border={'transparent'}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex
                  justifyContent={'space-between'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Text fontWeight={'medium'}>Superior Hierárquico</Text>
                  <Badge
                    colorScheme={
                      data.status === ENUN_REQUEST.PENDING &&
                      data?.status_manager === null
                        ? 'gray'
                        : data?.status_manager
                        ? 'green'
                        : 'red'
                    }
                  >
                    {' '}
                    {translate(data.status === ENUN_REQUEST.PENDING &&
                    data?.status_manager === null
                      ? ENUN_REQUEST.PENDING
                      : data?.status_manager
                      ? 'APPROVED'
                      : 'REJECTED')}
                  </Badge>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex
                flexDirection={'column'}
                p={2}
                border={'1px solid #f2f2f2'}
                bgColor={'#f2f2f2'}
              >
                <Box mb={2}>
                  <Text
                    _hover={{ textDecoration: 'underline' }}
                    cursor={'pointer'}
                    title="Ver Perfil"
                  >
                    {data?.feedback && data?.feedback[0]
                      ? data?.feedback[0].Employee.name
                      : data?.Manager_Employee
                      ? data?.Manager_Employee.name
                      : 'Não definido'}
                  </Text>
                </Box>
                <Flex flexDirection={'column'} gap={1}>
                  <Flex flexDirection={'column'}>
                    <Text fontWeight={'semibold'}>Nota</Text>
                    <Text bgColor={'#f2f2f2'}>
                      {data?.feedback && data?.feedback[0] ? (
                        data?.feedback[0].feedback
                      ) : (
                        <Text fontSize={11} fontWeight={'light'}>
                          Nenhuma nota
                        </Text>
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : null}

      <Accordion allowToggle border={'transparent'}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Flex
                justifyContent={'space-between'}
                width={'100%'}
                alignItems={'center'}
              >
                <Text fontWeight={'medium'}>Recursos Humanos</Text>
                <Badge
                    colorScheme={
                      data?.status === ENUN_REQUEST.PENDING
                        ? 'gray'
                        : data?.status === ENUN_REQUEST.APPROVED
                        ? 'green'
                        : 'red'
                    }
                  >
                    {' '}
                    {translate(String(data?.status))}
                  </Badge>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex
              flexDirection={'column'}
              p={2}
              border={'1px solid #f2f2f2'}
              bgColor={'#f2f2f2'}
            >
              <Box mb={2}>
                <Text
                  _hover={{ textDecoration: 'underline' }}
                  cursor={'pointer'}
                  title="Ver Perfil"
                >
                  {data?.feedback && data?.feedback[1]
                    ? data?.feedback[1].Employee.name
                    : 'Não definido'}
                </Text>
              </Box>
              <Flex flexDirection={'column'} gap={1}>
                <Flex flexDirection={'column'}>
                  <Text fontWeight={'semibold'}>Nota</Text>
                  <Text bgColor={'#f2f2f2'}>
                    {data?.feedback && data?.feedback[1]
                      ? data?.feedback[1].feedback
                      : 'Nenhuma nota'}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {isOpenModalFeedback ? (
        <Box bgColor={'#f2f2f2'} p={2}>
          <Text>Nota da rejeição (obrigatória)</Text>
          <Textarea
            backgroundColor={'white'}
            style={{ borderRadius: '8px' }}
            rows={4}
            size="sm"
            defaultValue={feedBackReject}
            onChange={setFeedbBackReject}
          />
        </Box>
      ) : null}
    </>
  )
}
