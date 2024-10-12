import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { Plus } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Brand } from '../../components/Brand'
import { Modal } from '../../components/Forms/Modal'
import { Main } from '../../components/Main'
import { HeaderWithNav } from '../../components/Navs/HeaderWithNavs'
import { NavFloat } from '../../components/Navs/NavFloat'
import SpinnerProgress from '../../components/SpinnerProgress'
import { Table } from '../../components/Table'
import useAsyncState from '../../hooks/use-async-state'
import { getAllCompanyFiles } from '../../services/Documents/company/get-all-company-documents.service'
import { dataTransform } from './company-files.types'
import UploadCompanyFiles from './upload'
import useColabContext from '../../context_api'

interface CompanyFilesProps {}
const CompanyFilesRh = (props: CompanyFilesProps) => {
  const { colabProvider } = useColabContext()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [files, setFiles] = useState<any[]>()
  const { loading, setLoading } = useAsyncState()

  useEffect(() => {
    ;(async () => {
      await getAllFiles()
    })()
  }, [])

  const getAllFiles = async () => {
    try {
      setLoading(true)
      setFiles(await getAllCompanyFiles())
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  if (loading) {
    return <SpinnerProgress></SpinnerProgress>
  }

  return (
    <Main>
      <HeaderWithNav
        image={undefined}
        title={colabProvider.user.name}
        hasAvatar
      >
        <NavFloat side="right">
          <Button
            leftIcon={<Plus weight="bold" size={20} />}
            colorScheme="yellow"
            borderRadius={4}
            variant="outline"
            onClick={onOpen}
          >
            Carregar arquivo
          </Button>
        </NavFloat>
      </HeaderWithNav>
      <Flex flexDirection={'column'} m={4}>
        <Brand
          title="Arquivos da empresa"
          description="Estes são os documentos partilhados pela empresa. Leia-os com atenção"
          position="center"
        ></Brand>

        {files && (
          <Table
            columns={[
              { id: 'id', isSortable: true, name: '#' },
              { id: 'description', isSortable: true, name: 'descrição' },
              { id: 'creation', isSortable: true, name: 'criado em' },
              { id: 'file', isSortable: true, name: '' },
            ]}
            dataSource={dataTransform(files || [])}
            placeholder=""
            searchKey="description"
          ></Table>
        )}
      </Flex>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        title="Carregar arquivo da empresa"
        description="Todos colaboradores poderão aceder a esse arquivo."
      >
        <UploadCompanyFiles
          onSave={async () => {
            await getAllFiles()
            onClose()
          }}
        ></UploadCompanyFiles>
      </Modal>
    </Main>
  )
}

export default CompanyFilesRh
