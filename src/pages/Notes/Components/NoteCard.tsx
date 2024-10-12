import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import { Clock, Pencil, Trash } from "phosphor-react";
import pathStaticFiles, { pathStaticFilesUserProfile } from "../../../utils/pathStaticFiles";
import PermissionGate from "../../../hooks/permissionGate";
import { Roles } from "../../../routes/roles";
import { DisplayDate } from "../../RequestDetails/util";

interface INoteCord {
  id: string
  title: string
  description: string
  image: string
  createdAt: string
  tag: string
  handleClik: (id: string) => void
  handleEdit: (id: string, data: any) => void
  handleDelete: (id: string) => void
}

export default function NoteCard(
  {
    id,
    title,
    description,
    image,
    createdAt,
    tag,
    handleClik,
    handleEdit,
    handleDelete
  }: INoteCord) {

  function printHTML(param: string) {
    return { __html: param }
  }

  return (
    <>
      <Box
        border={"1px solid #f2f2f2"}
        display={'flex'}
        flexDirection={'column'}
        flex={1}
        boxShadow={'md'}
      >
        <Box position={"relative"} minH={"80px"}>
          <Image
            src={`${pathStaticFiles(image)}`}
            alt={title}
          />
          <Box
            position={"absolute"}
            right={"0"}
            bottom={0}
            bgColor={"#d69e2e"}
            color={"white"}
            p={1}
          >
            <Text fontSize={"10px"}>{tag}</Text>
          </Box>
        </Box>
        <Box p={1} minH={"100px"} bgColor={'#f5f5f5'}>
          <Box
            marginTop={'10px'}
            color={'gray'}
            fontSize={'8px'}
            display={'flex'}
            gap={1}
            alignItems={'center'}
            justifyContent={'end'}
          >
            <Clock />
            <Text> {DisplayDate(String(createdAt))} </Text>

          </Box>
          <Box marginTop={'10px'}>
            <Text fontSize={'1rem'} fontWeight={'bold'} marginBottom={'10px'}>{title}</Text>
            <Text
              fontSize={'12px'}
              textAlign={'left'}
              textColor={'#171717'}
              dangerouslySetInnerHTML={printHTML(String(description).toString().slice(0, 100).concat('...'))}
              whiteSpace={'normal'}
              overflow={'hidden'}
              wordBreak={'break-word'}
              textOverflow={'ellipsis'}
            >
            </Text>
            <Box marginTop={'10px'}>
              <Text fontSize={'10px'}
                onClick={() => handleClik(String(id))}
                cursor={'pointer'}
                _hover={{
                  'textDecoration': 'underline'
                }} color={'#171717'}>Ler mais</Text>
            </Box>
          </Box>
        </Box>
        <Box p={1} bgColor={"#323232"} minH={'20px'}>
          <Stack direction="row" spacing={1} justifyContent={"end"}>
            <PermissionGate roles={[Roles.NOTES.can_edit_note]}>
              <Box
                fontSize={"xs"}
                cursor={"pointer"}
                p={1}
                color={'#fff'}
                borderRadius={"100%"}
                _hover={{
                  color: "white",
                  bgColor: "gray.200",
                }}
                onClick={() => handleEdit(String(id), {
                  id,
                  title,
                  description,
                  image,
                  createdAt,
                  tag,
                })}
              >
                <Pencil size={"15px"} />
              </Box>
            </PermissionGate>
            <PermissionGate roles={[Roles.NOTES.can_remove_note]}>
              <Box
                fontSize={"xs"}
                cursor={"pointer"}
                p={1}
                borderRadius={"100%"}
                color={"red"}
                _hover={{
                  color: "white",
                  bgColor: "red.400",
                }}
                onClick={() => handleDelete(String(id))}
              >
                <Trash size={"15px"} />
              </Box>
            </PermissionGate>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
