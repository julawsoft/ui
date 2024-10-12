import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Eye, GitDiff, Pencil, Stack, Trash } from "phosphor-react";
import React, { useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import PermissionGate from "../../hooks/permissionGate";
import { Roles } from "../../routes/roles";
import { IoClose } from "react-icons/io5";
import { FaCheck, FaDownload } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import { downloadFile } from "../../utils/download";

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
    handleDownloadAttach: () => void
    duracao?: string
    attach?: string
    note?: string
    statusText?: string
}


export function CardRequestHome({ icon, solicitacao, status, statusText, created, duracao, attach, isApproved, note, handleEdit, handleDelete, handleView, handleViewAttach, handleDownloadAttach }: ICardYourRequest) {
    const [isAskAction, setIsAskAction] = useState<boolean>(false)

    return (
        <>
            <Box boxShadow={'md'} border={'1px solid #d3d3d3'}>
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
                    <Flex flexDirection={'column'}>
                        <Text fontWeight={'semibold'}>
                            {solicitacao}
                        </Text>
                    </Flex>
                    <Flex gap={1} fontSize={12}>
                        <Text fontWeight={'semibold'}>Efeito: </Text>
                        <Text> {note} </Text>
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
                            { isApproved ? (
                                 <Text fontSize={10} fontWeight={'regular'}>
                                 Nenhum anexo!
                             </Text>
                            ): (<Box height={'15px'}></Box>)}
                           
                        </>
                    )}
                    {
                        isApproved ? (<Box height={'30px'}></Box>) : (
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
                                                        <Flex justifyContent={'space-between'} width={'100%'}>
                                                        <Box
                                                            fontSize={"xs"}
                                                            cursor={"pointer"}
                                                            p={1}
                                                            _hover={{
                                                                color: "#323232",
                                                                textDecoration: "underline",
                                                               
                                                            }}
                                                            color={'yellow.400'}
                                                            onClick={handleView}
                                                        >
                                                            <Text></Text>
                                                        </Box>
                                                        </Flex>
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
                </Flex>
            </Box>
        </>)
}