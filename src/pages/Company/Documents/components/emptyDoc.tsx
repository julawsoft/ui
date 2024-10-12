import { Box, Button, Flex } from "@chakra-ui/react"
import { Brand } from "../../../../components/Brand"
import { HiOutlineIdentification } from "react-icons/hi2";
import { Plus } from "phosphor-react";


interface EmptyDocProps {
    setIsUpload: (value: boolean) => void
}

export const EmptyEmployeeDocument = ({setIsUpload} : EmptyDocProps) => {
    return (
        <>
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                <Brand
                    title="Teus Documentos"
                    description="Nenhum documento adicionado"
                    position="center"
                    icon={<HiOutlineIdentification size={36}  color="#C2912E" />}
                ></Brand>
                <Button onClick={() => setIsUpload(true)}  bgColor={'yellow.400'}  color={'#fff'}>Adicionar</Button>
            </Flex>
        </>)
}