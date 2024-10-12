import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Eye, GitDiff, Pencil, Stack, Trash } from "phosphor-react";
import React, { Children, useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

interface ICardYourRequest {
    icon: React.ReactNode
    solicitacao: string
    status: string
    created: string
    isApproved: boolean
    handleEdit: () => void
    handleDelete: () => void
    handleView?: () => void
    handleViewAttach: () => void
    duracao?: string
    attach?: string
    note?: string
    isSelected?: boolean
    statusColor?: string
    children: React.ReactNode

}

export function CardYourRequest({ icon, solicitacao, status, created, duracao, statusColor, attach, isApproved, note, isSelected, handleEdit, handleDelete, handleView, handleViewAttach, children }: ICardYourRequest) {
    const [isAskAction, setIsAskAction] = useState<boolean>(false)
    return (
        <>
            <Box boxShadow={'md'} border={'1px solid #d3d3d3'}>
                <Flex flexDirection={'column'} p={4}
                    title="Ver mais detalhes"
                    bgColor={isSelected ? '#FCEECC' : '#ffffff'}         
                    _hover={{
                        bg: '#F6F2E9'
                      }}           
                >
                    <Flex gap={1} justifyContent={'space-between'} fontSize={'11px'} alignItems={'center'} mb={2}>
                        <Box color={'#C2912E'} fontSize={28}>
                            {icon}
                        </Box>
                        <Flex flexDirection={'column'} justifyContent={'end'} textAlign={'right'}>
                            <Box color={'gray.400'}>
                                <Text fontSize={'11px'} fontWeight={'semibold'}>{created}</Text>
                            </Box>
                            <Box>
                                <Badge variant='outline' colorScheme={statusColor}>
                                    <Text fontSize={'10px'}>{status}</Text>
                                </Badge>
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex flexDirection={'column'}>
                        <Text fontWeight={'semibold'}>
                            {solicitacao}
                        </Text>
                    </Flex>
                    <Flex flexDirection={'column'} height={'100%'}>
                        <Box maxHeight={'50px'} overflow={'hidden'} mb={2}>
                            <Text fontWeight={'regular'}>
                                {note}
                            </Text>
                        </Box>
                    </Flex>
                    {attach ? (
                        <>
                            <Flex
                                gap={2}
                                alignItems={'center'}
                                onClick={handleViewAttach}
                                cursor={'pointer'}
                            >
                                <Text fontSize={'11px'} color={''}>{attach}</Text>
                                <Text
                                    _hover={{ textDecoration: 'underline' }}
                                    title="Trocar o anexo"

                                >
                                    <TiAttachment size={18} />
                                </Text>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Text fontSize={10} fontWeight={'regular'}>
                                Nenhum anexo!
                            </Text>
                        </>
                    )}
                    <Flex>
                       {children}
                    </Flex>

                    {/*                    
                    {
                        isApproved ? (null) : (
                            <>
                                {
                                    isAskAction ?
                                        (
                                            <>
                                                <Box p={1} bgColor={"#323232"} minH={'20px'} width={'auto'}>
                                                    <Flex direction="row" gap={10} justifyContent={"end"} alignItems={'center'}>
                                                        <Text color={"#fff"} fontSize={12}>Pretende eliminar ? </Text>
                                                        <Box
                                                            fontSize={"xs"}
                                                            cursor={"pointer"}
                                                            p={1}
                                                            borderRadius={"100%"}
                                                            color="white"
                                                            bgColor="green.200"
                                                            onClick={handleDelete}
                                                        >
                                                            <FaCheck size={"15px"} />
                                                        </Box>                                    <Box
                                                            fontSize={"xs"}
                                                            cursor={"pointer"}
                                                            p={1}
                                                            borderRadius={"100%"}
                                                            color="white"
                                                            bgColor="red.400"
                                                            onClick={() => setIsAskAction(false)}
                                                        >
                                                            <IoClose size={"15px"} />
                                                        </Box>


                                                    </Flex>
                                                </Box>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <Box p={1} bgColor={"#f2f2f2"} minH={'20px'} width={'auto'}>
                                                    <Flex direction="row" gap={1} justifyContent={"end"}>

                                                        <Box
                                                            fontSize={"xs"}
                                                            cursor={"pointer"}
                                                            p={1}
                                                            borderRadius={"100%"}
                                                            _hover={{
                                                                color: "white",
                                                                bgColor: "gray.200",
                                                            }}
                                                            onClick={handleEdit}
                                                        >
                                                            <Pencil size={"15px"} />
                                                        </Box>
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
                                                            onClick={() => setIsAskAction(true)}
                                                        >
                                                            <Trash size={"15px"} />
                                                        </Box>


                                                    </Flex>
                                                </Box>
                                            </>
                                        )
                                }

                            </>)
                    }


                    */}
                </Flex>
            </Box>
        </>)
}