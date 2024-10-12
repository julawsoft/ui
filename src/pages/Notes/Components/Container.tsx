import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IContainer {
    title: string
    children: ReactNode
    bgColor?: string
    color?: string
    padding?: string
}

export default function Container ({title, children, bgColor, color, padding}: IContainer) {
    return (
        <Box boxShadow={'md'} width={'100%'} bgColor={bgColor ?? '#fff'} p={padding ?? '4'} color={color ?? "#15171C"} borderRadius={4}>
            <Box width={'100%'} borderBottom={'1px solid #15171C'} p={padding ? 2 : padding}>
                <Text fontWeight={'bold'}>{title}</Text>
            </Box>
            <Box width={'100%'} marginTop={5}>
                {children}
            </Box>
        </Box>
    )
}