// import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  Flex,
  Image,
  Link,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import iconColob from '../../../assets/images/icon/favicon.png'
import useSetupSteps from '../../../hooks/useSetupSteps'
import { useEffect, useState } from 'react'
import { StepContainer } from './components/StepContainer'
import { StepProfile } from './components/StepProfile'
import { StepDetails } from './components/StepDetails'
import { StepDocuments } from './components/StepDocuments'
import { IDtatSetup, STEPS } from './utils'
import { StepBank } from './components/StepBank'
import { toast } from 'react-toastify'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../../routes/constants'
import { SetupService } from '../../../services/Setup/setup'
import { Loader } from '../../../components/Loader'
import { redirect } from '../../../utils/http/redirect'
import SpinnerProgress from '../../../components/SpinnerProgress'

export function Setup() {

  const { token } = useParams()
  const navigate = useNavigate()
  const { state } = useLocation()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  if(!state) {  
    toast.error("Token inválido/expirado")
    setIsError(true)
     //return redirect(`${ROUTES.NOTFOUND}`, 'Token invalido/expirado', navigate, '')
  } 

  const isMobile = useBreakpointValue({ base: true, md: false })

  const [dataSetup, setDataSetup] = useState<IDtatSetup>({
    token: token ?? '',
    email: state.email,
    password: '',
    name: state.employee_name,
    birthdate: String(state.employee_birthday).substring(0, 10),
    bankName: state.bank_name,
    bankAccount: state.account_number,
    bankIban: state.account_iban,
    ss: state.social_assurence,
    address: state.address,
    append: state.document,
  })

  //const companyName = 'state.company_name'
  const companyName = state.company_name

  const [indexStep, handleNext, handleBack] = useSetupSteps((state) => [
    state.indexStep,
    state.handleBack,
    state.handleNext,
  ])

  const [isFirstStep] = useState<boolean>(indexStep === 0)
  const [isLastStep] = useState<boolean>(indexStep === 3)

  useEffect(() => {
    setIsLoadingPage(true)
    if (!token || !companyName) {
      toast.error('Invalid token')
      setTimeout(() => {
        navigate(`${ROUTES.NOTFOUND}`)
      }, 1000)
    } else {
      setTimeout(() => {
        setIsLoadingPage(false)
      }, 2000)
    }
  }, [])

  const submitForm = () => {
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const endData = {
          address: dataSetup.address,
          account_number: dataSetup.bankAccount,
          account_iban: dataSetup.bankIban,
          bank_name: dataSetup.bankName,
          social_assurance: dataSetup.ss,
          birthday: dataSetup.birthdate,
          name: dataSetup.name,
          password: dataSetup.password,
          attach: dataSetup.append,
          token,
        }

        const response = await SetupService(endData)
        if(response){

          if (response.response.statusCode === 200) {
            toast.success('Activou a tua conta com Sucesso!')
            handleRedirect()
          } else {
            toast.error(response.response.message)
          }
        }
      } catch (e) {
        setIsLoading(false)
        toast.error(String(e))
        setIsError(true)
      }
    }, 1000)
  }

  const handleRedirect = () => {
    setTimeout(() => {
      navigate(ROUTES.Login)
    }, 1000)
  }

  const renderContent = () => {
    return indexStep === 0 ? (
      <StepContainer description="step 01">
        <StepProfile
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          indexStep={indexStep}
          handleBack={handleBack}
          handleNext={handleNext}
          setDataSetup={setDataSetup}
          dataSetup={dataSetup}
          handleDataSetup={submitForm}
        />
      </StepContainer>
    ) : indexStep === 1 ? (
      <StepContainer description="step 02">
        <StepDetails
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          indexStep={indexStep}
          handleBack={handleBack}
          handleNext={handleNext}
          setDataSetup={setDataSetup}
          dataSetup={dataSetup}
          handleDataSetup={submitForm}
        />
      </StepContainer>
    ) : indexStep === 2 ? (
      <StepContainer description="step 03">
        <StepBank
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          indexStep={indexStep}
          handleBack={handleBack}
          handleNext={handleNext}
          setDataSetup={setDataSetup}
          dataSetup={dataSetup}
          handleDataSetup={submitForm}
        />
      </StepContainer>
    ) : (
      <StepContainer description="step 04">
        <StepDocuments
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          indexStep={indexStep}
          handleBack={handleBack}
          handleNext={handleNext}
          setDataSetup={setDataSetup}
          dataSetup={dataSetup}
          handleDataSetup={submitForm}
          isLoading={isLoading}
        />
      </StepContainer>
    )
  }

  return (
    <>
      {isLoadingPage && !isError ? (
        <Flex bgColor={'#26282a'} color={'#fff'} justifyContent={'center'} height={'100vh'} alignItems={'center'} flexDirection={'column'}>
          <SpinnerProgress />
          <Text>Carregando...</Text>
        </Flex>
      ) : (
        <Flex bgColor={'#26282a'} width={'100vw'} color={'#d1d2dc'} fontFamily={'Roboto'} flexDirection={'column'}>
          <Flex
            width={'100%'}
            maxWidth={'960px'}
            margin={'0 auto'}
            minHeight={'90vh'}
            p={'20px'}
            mt={'1rem'}
            mb={'10px'}
            flexDirection={'column'}
          >
            <Flex   flexDirection={'column'} gap={4}>
              <Flex   flexDirection={'column'} mb={'2rem'}>
                <Text fontSize={isMobile ? '1.5rem' : '1.8rem'} fontWeight={'semi-bold'}>
                  Bem-vindo(a) à {companyName}{' '}
                </Text>
                <Text fontSize={isMobile ? '.9rem' :'1.1rem'}>
                  Siga os passos abaixo para activar a tua conta
                </Text>
              </Flex>
              <Flex
                
                bgColor={'#f5f5f7'}
                p={4}
                border={'.2px solid #dddddd'}
                color={'#26282a'}
                borderRadius={8}
                width={'100%'}
              >
                <Stepper 
                    index={indexStep} 
                    colorScheme="yellow" 
                    display={'flex'}
                    width={'100%'}
                >
                  {STEPS.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>

                      <Flex flexShrink="1">
                        <StepDescription>{isMobile ? '' :step.description}</StepDescription>
                      </Flex>
                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
              </Flex>
              <Flex height={'auto'} color={'#26282a'}>
                {renderContent()}
              </Flex>
            </Flex>
          </Flex>
          <Flex px={4}bottom={0} bgColor={'#323232'} w={'100%'} height={'100px'}>
            <Flex width={'100%'} maxWidth={'960px'} margin={'0 auto'}>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                height={'100px'}
                width={'100%'}
              >
                <Flex width={'100%'}>
                  <Flex gap={2} alignItems={'center'}>
                    <Image
                      src={iconColob}
                      width={'36px'}
                      height={'36px'}
                      maxWidth={'100%'}
                      alt="Plataforma Colab"
                    />
                    <Text
                      fontSize={'24px'}
                      textTransform={'uppercase'}
                      fontWeight={'extrabold'}
                      fontFamily={'body'}
                      textColor={'#c3912e'}
                    >
                      {'Colab'}
                    </Text>
                  </Flex>
                </Flex>
                <Flex width={'100%'}>
                  <Text fontSize={'12px'}>
                    Copyright © 2024{' '}
                    <Link href="https://cetim.ao" isExternal color={'#c3912e'}>
                      {companyName}
                    </Link>{' '}
                    Todos os direitos reservados.
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  )
}
