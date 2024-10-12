import { useEffect } from 'react'

import {
  Container,
  GridContainer,
  ContainerCards,
  GridCardHome,
  ContainerBigCards,
  EmptyBigCard,
} from './style'

import SpinnerProgress from '../../components/SpinnerProgress/index'
import CardRH from '../../components/CardRH/index'
import CardBigRH from '../../components/CardBigRH/index'
import ItemCardRH from '../../components/ItemCardRH/index'
import {
  IEmployeeContract,
  IEmployeesByCategory,
  IEmployeesByDepartment,
  ILatestRequestedAbsences,
} from '../../services/DashboardRH/interfaces'
import { ItemNextAbsences } from './components/ItemNextAbsences/index'
import UseCaseState from './use_async_state'

export function HomeRHOLD() {
  const {
    isLoading,
    setIsLoading,
    totalColab,
    vocationColab,
    // solicitationPending,
    employeesEndingContract,
    employeesByCategory,
    employeesByDepartment,
    latestRequestedAbsences,
    // indexAssiduity,
    // indexNotAssiduity,
    // unjustifiedAbsence,
    // justifiedAbsence,
    // absence,
    // presence,
    totalPendingDocuments,
    totalPendingAbsences,
  } = UseCaseState()

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return (
    <Container>
      <GridContainer>
        {isLoading ? (
          <SpinnerProgress />
        ) : (
          <>
            {' '}
            <GridCardHome>
              <ContainerCards>
                <CardRH
                  isBlack={true}
                  value={totalColab}
                  description={'Total de colaboradores'}
                />
                <CardRH
                  value={vocationColab}
                  description={'Colaboradores em férias'}
                />
                <CardRH
                  value={totalPendingDocuments}
                  description={'Solicitações Documentos'}
                />
                <CardRH
                  value={totalPendingAbsences}
                  description={'Solicitações Ausências'}
                />
              </ContainerCards>
              <ContainerBigCards>
                {/* <CardBigRH title="Ausências">
                  {unjustifiedAbsence + justifiedAbsence !== 0 ? (
                    <PieCharts data={absence} />
                  ) : (
                    <EmptyBigCard>Não tem Ausências registadas</EmptyBigCard>
                  )}
                  </CardBigRH> */}
                {/* <CardBigRH title="Índice de Assiduidade">
                  {indexNotAssiduity + indexAssiduity !== 0 ? (
                    <DoubleProgressBarCircular data={presence} />
                  ) : (
                    <EmptyBigCard>
                      Não existe Índice de Assiduidade registado
                    </EmptyBigCard>
                  )}
                </CardBigRH>
                */}
                <CardBigRH title="Próximas Ausências">
                  {latestRequestedAbsences.length ? (
                    latestRequestedAbsences.map(
                      (item: ILatestRequestedAbsences, key: number) => (
                        <ItemNextAbsences details={item} key={item.id} />
                      ),
                    )
                  ) : (
                    <EmptyBigCard>Não existem próximas Ausências</EmptyBigCard>
                  )}
                </CardBigRH>
                <CardBigRH title="Colaboradores em final de contrato">
                  {employeesEndingContract.length ? (
                    employeesEndingContract.map(
                      (item: IEmployeeContract, key: number) => (
                        <ItemCardRH
                          keys={item.name}
                          value={item.data}
                          key={key}
                        />
                      ),
                    )
                  ) : (
                    <EmptyBigCard>
                      Não existem colaboradores em final de contrato
                    </EmptyBigCard>
                  )}
                </CardBigRH>
                <CardBigRH title="Colaboradores por Categorias">
                  {employeesByCategory.length ? (
                    employeesByCategory.map(
                      (item: IEmployeesByCategory, key: number) => (
                        <ItemCardRH
                          keys={item.name}
                          value={item.totalEmployees}
                          key={key}
                        />
                      ),
                    )
                  ) : (
                    <EmptyBigCard>
                      Não existem colaboradores com categorias
                    </EmptyBigCard>
                  )}
                </CardBigRH>
                <CardBigRH title="Colaboradores por Direcções">
                  {employeesByDepartment.length ? (
                    employeesByDepartment.map(
                      (item: IEmployeesByDepartment, key: number) => (
                        <ItemCardRH
                          keys={item.description}
                          value={item.TotalEmployees}
                          key={key}
                        />
                      ),
                    )
                  ) : (
                    <EmptyBigCard>
                      Não existem colaboradores em Direcções
                    </EmptyBigCard>
                  )}
                </CardBigRH>
              </ContainerBigCards>
            </GridCardHome>
          </>
        )}
      </GridContainer>
    </Container>
  )
}
