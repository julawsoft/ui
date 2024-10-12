import { Box, Flex, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CardGlobal } from "../Components/CardGlobal";
import { CardRequestDocument } from "../Components/CardRequestDocument";

export function CardDocument() {

  const [showAll, setShowAll] = useState<boolean>(false)
  const [requestTypeSelected, setRequestTypeSelected] = useState<number>(0)
  const [departamentSelected, setDepartamentSelected] = useState<number>(0)

  return (

    <Box mt={5}>
      <Flex flexDirection={'column'} gap={4}>
        <Flex
          width={'100%'}
          borderRadius={'6'}
          height={'100%'}
          minHeight={'350px'}
          gap={6}
          flexDirection={'column'}
        >
          <CardGlobal
            showAll={showAll}
            setShowAll={setShowAll}
            setRequestTypeSelected={setRequestTypeSelected}
            setDepartamentSelected={setDepartamentSelected}
          >
            <CardRequestDocument
              showAll={showAll}
              setShowAll={setShowAll}
              requestType={requestTypeSelected}
              departamentSelected={departamentSelected}
            />
          </CardGlobal>
        </Flex>
      </Flex>      
      </Box>
  )
}
