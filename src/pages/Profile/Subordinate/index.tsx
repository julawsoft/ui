import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";

export interface SubordinateProps {
    title: string
    subordinateName: string
    buttonAction: () => {}
}

export function Subordinate({ title, subordinateName, buttonAction }: SubordinateProps) {

    return (
        <>
            <Box
                w="100%"
                h="100%"
                p={4}
                bg="#EDE6DE"
                borderRadius={10}
                overflow="hidden"
                border="1px solid #E5DACF"
                display="inline-flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <VStack
                    alignSelf="stretch"
                    p={4}
                    gap={8}
                    align="flex-start"
                >
                    <Text
                        color="#5A5A66"
                        fontSize="18px"
                        fontFamily="Roboto"
                        fontWeight="400"
                        lineHeight="25.2px"
                        wordBreak="break-word"
                    >
                        {title}
                    </Text>
                    <Button
                        width="100%"
                        height="100%"
                        px={4}
                        py={2}
                        background="rgba(255, 255, 255, 0.44)"
                        borderRadius={6}
                        overflow="hidden"
                        border="1px solid #C2912E"
                        justifyContent="center"
                        alignItems="center"
                        display="inline-flex"
                        color="#C2912E"
                        fontSize="20px"
                        fontFamily="Roboto"
                        fontWeight="600"
                    >
                        {subordinateName}
                    </Button>
                </VStack>
            </Box>
        </>
    )
}