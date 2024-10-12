import { Box, Flex, Text } from "@chakra-ui/react"
import { TitleValue } from "../Absence"

import { TbBuilding } from "react-icons/tb";

interface ICompanyMissaoDepartamentos {
    key: string | number
    value: string
    src: string
    size: string
    link: string
    params: any
    onClickDepto: (link: string, params: any) => void
    onClickManager: (link: string, params: any) => void

}

export const CompanyMissaoDepartamentos = ({ key, src, size, value, link, params, onClickDepto, onClickManager }: ICompanyMissaoDepartamentos) => {
    return (
        <Flex gap={2} alignItems={'center'} key={key}>
            <TbBuilding size="32px" />
            <Flex flexDirection="column">
                <TitleValue value={value} link={link} params={params} onClick={() => onClickDepto(link, params)} />
                <Box onClick={() => onClickManager(link, params)}> 
                    <Text fontSize="10px" cursor={'pointer'} >Responsavel</Text>
                </Box>
            </Flex>
        </Flex>
    )
}