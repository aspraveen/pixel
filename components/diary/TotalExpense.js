import { Box, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"

const TotalExpense = ({ totalExpense }) => {
  return (
    <Box
      p={2}
      bgColor={useColorModeValue("gray.600", "orange.600")}
      color={useColorModeValue("gray.200", "gray.100")}
      rounded={"md"}
    >
      Total Spend <br />
      {totalExpense}
    </Box>
  )
}
export default TotalExpense
