import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { BellRinging } from 'phosphor-react'

import { Table } from '../../components/Table'
import { Brand } from '../../components/Brand'
import { Main } from '../../components/Main/index'

import { NotifictionsService } from '../../services/Notifications'
import { columns, dataTransform } from './transform'

import { INotifications } from '../../schema/Notifications'
import { useNavigate } from 'react-router-dom'
import useColabContext from '../../context_api'

export function Notifications() {
  const navigate = useNavigate()
  const [dataNotifications, setDataNotifications] = useState<INotifications[]>(
    [],
  )

  const { colabProvider } = useColabContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const init = async () => {
      await getAllByEmployeeId(colabProvider.user.id)
    }
    init()
    setLoading(false)
  }, [])

  async function getAllByEmployeeId(id: number) {
    const response = await NotifictionsService.getAllByEmployeeId(id)
    setDataNotifications(response)
  }

  const handleOpen = async (url: string, employeeId: number, id: number) => {
    navigate(url, { state: { id } })
  }

  return (
    <Main>
      <Brand
        title="Notificações"
        description="Aqui estão todas as suas notificações, inclusive as que já foram lidas."
        icon={<BellRinging size={50} color="#C2912E" />}
        position="center"
      />

      <Box px={6}>
        <Table
          isLoading={loading}
          columns={columns}
          dataSource={dataTransform(dataNotifications, handleOpen)}
          placeholder="Pesquise por uma notificação"
          searchKey="description"
        />
      </Box>
    </Main>
  )
}
