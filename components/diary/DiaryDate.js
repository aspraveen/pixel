import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import NthNumber from "./NthNumber"
const DiaryDate = ({ date, page }) => {
  let day = new Date(date).getDate()
  let month = new Date(date).getMonth()
  let year = new Date(date).getFullYear()
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  let dayName = days[new Date(date).getDay()]
  let monthName = months[month]
  if (page == "display") {
    return (
      <Flex>
        <Box fontSize={"xl"}>{monthName},</Box>
        <Box ml={2} fontSize={"xl"}>
          {day}
        </Box>
        <Box>
          <NthNumber number={day} />
        </Box>
        <Box
          ml={2}
          bgColor={useColorModeValue("purple.200", "purple.600")}
          color={useColorModeValue("black", "white")}
          rounded={"md"}
          fontSize={"sm"}
          p={1}
        >
          {year}
        </Box>
        <Box
          ml={2}
          bgColor={useColorModeValue("orange.200", "orange.400")}
          color={useColorModeValue("black", "white")}
          rounded={"md"}
          fontSize={"sm"}
          p={1}
        >
          {dayName}
        </Box>
      </Flex>
    )
  } else {
    return (
      <Flex>
        <Box fontSize={"sm"}>{monthName} ,</Box>
        <Box ml={2} fontSize={"xl"}>
          {day}
        </Box>
        <Box>
          <NthNumber number={day} />
        </Box>
        <Box
          ml={2}
          color={useColorModeValue("black", "white")}
          rounded={"md"}
          fontSize={"sm"}
          p={1}
          borderWidth={1}
          borderColor={useColorModeValue("purple.200", "purple.600")}
        >
          {year}
        </Box>
        <Box
          ml={2}
          borderWidth={1}
          borderColor={useColorModeValue("blue.200", "blue.600")}
          color={useColorModeValue("black", "white")}
          rounded={"md"}
          fontSize={"sm"}
          p={1}
        >
          {dayName}
        </Box>
      </Flex>
    )
  }
}
export default DiaryDate
