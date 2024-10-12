import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Eye, GitDiff, Pencil, Stack, Trash } from "phosphor-react";
import React, { useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import PermissionGate from "../../hooks/permissionGate";
import { Roles } from "../../routes/roles";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";

interface ICardYourRequest {
    icon: React.ReactNode
    employee: string
    image: string
    solicitacao: string
    status: string
    statusText: string
    created: string
    isApproved: boolean
    handleEdit: () => void
    handleDelete: () => void
    handleView?: () => void
    handleViewAttach: () => void
    handleDownloadAttach: () => void
    duracao?: string
    attach?: string
    note?: string
    noteReject?: string

}

export function CardRequestHomeRH({ employee, image, icon, solicitacao, status, statusText, created, duracao, attach, isApproved, note, noteReject, handleEdit, handleDelete, handleView, handleViewAttach, handleDownloadAttach }: ICardYourRequest) {
    const [isAskAction, setIsAskAction] = useState<boolean>(false)

    console.log(statusText)

    return (
        <>
            <Box boxShadow={'md'} border="1px solid #c3c3c3">
                <Flex flexDirection={'column'} p={4}
                    title="Ver mais detalhes"
                    bgColor={'#ffffff'}
                >
                    <Flex gap={1} justifyContent={'space-between'} fontSize={'11px'} alignItems={'center'} mb={2}>
                        <Box color={'#C2912E'} fontSize={28}>
                            {icon}
                        </Box>
                        <Flex flexDirection={'column'} justifyContent={'end'} textAlign={'right'}>
                            <Box color={'gray.400'}>
                                <Text fontSize={'9px'} fontWeight={'semibold'}>{created}</Text>
                            </Box>
                            <Box>
                                <Badge variant='outline' colorScheme={statusText}>
                                    <Text fontSize={'10px'}>{status}</Text>
                                </Badge>
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex gap={2} alignItems={'center'}>
                        <Avatar name={employee} src={image} size={'xs'} />
                        {employee}
                    </Flex>
                    <Flex flexDirection={'row'}>
                        <Text fontWeight={'semibold'}>
                            {solicitacao} 
                        </Text>
                    </Flex>
                    <Flex flexDirection={'row'} gap={1} fontSize={12}>
                        <Text fontWeight={'semibold'}>
                           Efeito: 
                        </Text>
                        <Text>
                            {note} 
                        </Text>
                    </Flex>
                    {attach ? (
                        <>
                            <Flex
                                gap={4}
                                alignItems={'center'}
                                justifyContent={'end'}
                                cursor={'pointer'}
                                _hover={{ textDecoration: 'underline' }}
                                color={'yellow.400'}
                               
                                flexDirection={'row'}
                                height={'30xp'}
                            >
                                <Text fontSize={'15px'} color={''}  title="Ver anexo"  onClick={handleViewAttach} ><IoIosAttach /> </Text>
                                <Text fontSize={'12px'} color={''} title="Download anexo"  onClick={handleDownloadAttach}><FaDownload /></Text>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Text fontSize={10} fontWeight={'regular'}>
                                Nenhum anexo!
                            </Text>
                        </>
                    )}
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
                                                    <Flex direction="row" gap={3} justifyContent={"end"}>

                                                        <Box
                                                            fontSize={"xs"}
                                                            cursor={"pointer"}
                                                            p={1}
                                                            borderRadius={"100%"}
                                                            _hover={{
                                                                color: "white",
                                                                bgColor: "yellow.500",
                                                            }}
                                                            color={"white"}
                                                            bgColor={"yellow.400"}
                                                            onClick={handleView}
                                                            textAlign={'center'}
                                                        >
                                                            <IoDocument size={"15px"} />
                                                        </Box>
                                                    </Flex>
                                                </Box>
                                            </>
                                        )
                                }

                            </>)
                    }
                </Flex>
            </Box>
        </>)
}