import { Box, useColorModeValue } from "@chakra-ui/react"
const Badges = ({ data, type }) => {
  if (data == null || data == "") {
    return ""
  }
  if (type == "tags") {
    if (data.indexOf(",") > 0) {
      let wordsArray = data.split(",")
      return wordsArray.map((item, index) => (
        <Box
          key={index}
          borderWidth={1}
          borderColor={"blue.300"}
          color={"blue.400"}
          fontSize={"xs"}
          rounded={"md"}
          p={1}
          textAlign={"center"}
          backgroundColor={useColorModeValue("blue.50", "blue.800")}
        >
          {item}
        </Box>
      ))
    } else {
      return (
        <Box
          borderWidth={1}
          borderColor={"blue.300"}
          color={"blue.400"}
          fontSize={"xs"}
          rounded={"md"}
          p={1}
          textAlign={"center"}
          backgroundColor={useColorModeValue("purple.50", "purple.800")}
        >
          {data}
        </Box>
      )
    }
  } else if (type == "people") {
    return (
      <Box
        borderWidth={1}
        borderColor={"cyan.200"}
        color={"cyan.400"}
        fontSize={"xs"}
        rounded={"md"}
        p={1}
        textAlign={"center"}
      >
        {data}
      </Box>
    )
  } else if (type == "amount") {
    return (
      <Box
        borderWidth={1}
        borderColor={useColorModeValue("purple.300", "purple.400")}
        bgColor={useColorModeValue("purple.50", "purple.700")}
        color={useColorModeValue("purple.600", "gray.100")}
        fontSize={"xs"}
        rounded={"md"}
        p={1}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        {data}
      </Box>
    )
  } else if (type == "places") {
    return (
      <Box
        borderWidth={1}
        borderColor={"green.200"}
        color={"green.400"}
        fontSize={"xs"}
        rounded={"md"}
        p={1}
        textAlign={"center"}
      >
        {data}
      </Box>
    )
  } else if (type == "impact") {
    let amount = parseFloat(data)
    if (amount > 199) {
      return (
        <Box
          borderWidth={1}
          borderColor={"red.300"}
          color={"red.400"}
          fontSize={"xs"}
          textAlign={"center"}
          rounded={"md"}
          p={1}
          height={"7"}
        >
          Extreme
        </Box>
      )
    } else if (amount > 99 && amount <= 199) {
      return (
        <Box
          borderWidth={1}
          borderColor={"blue.300"}
          color={"blue.400"}
          fontSize={"xs"}
          textAlign={"center"}
          rounded={"md"}
          p={1}
          height={"7"}
        >
          High
        </Box>
      )
    } else if (amount > 49 && amount <= 99) {
      return (
        <Box
          borderWidth={1}
          borderColor={"green.300"}
          color={"green.400"}
          fontSize={"xs"}
          textAlign={"center"}
          rounded={"md"}
          p={1}
          height={"7"}
        >
          Big
        </Box>
      )
    } else if (amount > 25 && amount <= 49) {
      return (
        <Box
          borderWidth={1}
          borderColor={"yellow.300"}
          color={"yellow.400"}
          fontSize={"xs"}
          textAlign={"center"}
          rounded={"md"}
          p={1}
          height={"7"}
        >
          Little
        </Box>
      )
    } else {
      return (
        <Box
          borderWidth={1}
          borderColor={"purple.300"}
          color={"purple.400"}
          fontSize={"xs"}
          rounded={"md"}
          p={1}
          height={"7"}
          textAlign={"center"}
        >
          Low
        </Box>
      )
    }
  } else {
    return (
      <Box
        borderWidth={1}
        borderColor={"blue.300"}
        color={"blue.400"}
        fontSize={"xs"}
        rounded={"md"}
        p={2}
        height={"7"}
        textAlign={"center"}
      >
        {data}
      </Box>
    )
  }
}
export default Badges
