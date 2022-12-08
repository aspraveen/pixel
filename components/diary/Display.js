import { Box, VStack, Flex } from "@chakra-ui/react"

const Display = ({ data }) => {
  return (
    <Box height={"90vh"} overflow={"auto"} scrollBehavior={"auto"} p={5}>
      <VStack>
        {data.map((entry, index) => (
          <Box
            key={index}
            p={3}
            fontFamily={"Open Sans"}
            textTransform={"capitalize"}
            rounded={"md"}
            fontSize={"sm"}
            boxShadow={"base"}
            width={"700px"}
          >
            <Box fontWeight={"bold"} color={"gray.600"}>
              {entry.title}
            </Box>
            <Box color={"whiteAlpha.600"} lineHeight={"6"}>
              {entry.details}
            </Box>
            <Flex>
              <Box></Box>
              <Box fontSize={"3xl"} color={"purple.400"}>
                {entry.amount}
              </Box>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}
export default Display
