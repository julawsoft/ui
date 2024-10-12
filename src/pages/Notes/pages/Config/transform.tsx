import { INotesClassification } from '../../../../schema/NotesInformative'
import { Flex } from '@chakra-ui/react'
import { PencilSimpleLine } from 'phosphor-react'

export const columns: any = [
  {
    id: 'id',
    name: '#',
    isSortable: true,
  },
  {
    id: 'description',
    name: 'Descrição',
    isSortable: true,
  },
  {
    id: 'options',
    name: 'Opções',
    isSortable: false,
  },
]

export function dataTransform(
  data: INotesClassification[],
  handleEdit: (id: any) => void,
) {
  return data.length
    ? data.map((item: INotesClassification) => ({
        id: item.id,
        description: item.tag,
        options: (
          <Flex gap={3}>
            <PencilSimpleLine
              size={20}
              cursor={'pointer'}
              color="#a8a5a5"
              onClick={() => handleEdit(item)}
            />
          </Flex>
        ),
      }))
    : []
}
