import {
  Card,
  CardBody,
  Heading,
  CardFooter,
  Stack,
  Text,
  Image,
  Divider,
  ButtonGroup,
  Button,
  Box,
} from '@chakra-ui/react'
import { Description } from './styled'
import { Eye, PencilSimple } from 'phosphor-react'

interface INotes {
  title: string
  description: string
  image: any
  depto?: string
  employee?: number
  tag: string
  link: string
  createdAt: string
  handleDetails: any
  handleEdit: any
  canEdit: boolean
}
const CardNotes = ({
  title,
  description,
  image,
  depto,
  employee,
  tag,
  link,
  createdAt,
  handleDetails,
  handleEdit,
  canEdit,
}: INotes) => {
  function printHTML(param: string) {
    return { __html: param }
  }

  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={image} alt={title} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Description
            dangerouslySetInnerHTML={printHTML(description)}
          ></Description>
          <Box display="flex" alignItems="baseline">
            <Text fontWeight={'bold'}>Categoria:</Text>{' '}
            <Text>{tag ?? 'Geral'}</Text>
          </Box>
          <Box display="flex" alignItems="baseline">
            <Text fontWeight={'bold'}>Departamento: </Text>
            <Text>{depto ?? 'Não informado'}</Text>
          </Box>
          <Box display="flex" alignItems="baseline" color="#323232" fontSize="">
            <Text fontWeight={'bold'}>Criada em: </Text>
            <Text>{new Date(createdAt).toLocaleDateString()}</Text>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            bg="#c2912e"
            color="white"
            onClick={handleDetails}
          >
            <Eye size={18} cursor={'pointer'} alt={'Ler mais detalhes'} />
          </Button>
          {canEdit ? (
            <Button variant="ghost" onClick={handleEdit}>
              <PencilSimple
                size={20}
                cursor={'pointer'}
                alt={'Editar a nota'}
              />
            </Button>
          ) : null}
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default CardNotes
