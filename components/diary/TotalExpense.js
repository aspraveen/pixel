import { Badge, Box, Center, Divider, useColorModeValue } from "@chakra-ui/react"

const TotalExpense = ({ totalExpense }) => {
  return (
    <>
      <Divider my={5} />
      <Box
        width={["160px", null, "160px"]}
        p={2}
        color={useColorModeValue("purple.500", "purple.100")}
        borderBottomWidth={4}
        fontSize={"xl"}
        borderBottomColor={"purple.200"}
        rounded={"md"}
      >
        <Badge variant={"outline"} colorScheme="purple" mr={3}>
          Total
        </Badge>
        {totalExpense}
      </Box>
    </>
  )
}
export default TotalExpense
