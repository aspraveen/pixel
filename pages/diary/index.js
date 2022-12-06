import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"
import {
  Container,
  Input,
  Box,
  Textarea,
  Select,
  HStack,
  Wrap,
  WrapItem,
  IconButton,
  Flex,
  Button,
  Tab,
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
  SimpleGrid,
  VStack,
  Spinner,
  Center,
  Fade,
} from "@chakra-ui/react"

import useSWR from "swr"
import Footer from "../../components/Footer"
import Header from "../../components/diary/Header"
import { useState } from "react"
const index = () => {
  const dateString = new Date()
  const [selectedDate, setSelectedDate] = useState(dateString.toISOString().slice(0, 10))
  console.log("🚀 ~ file: index.js:34 ~ index ~ transDate", selectedDate)
  const fetcher = async (url, selectedDate) => {
    console.log("🚀 ~ file: index.js:35 ~ fetcher ~ transDate", selectedDate)

    const response = await fetch(`${url}${selectedDate}`)
    const data = await response.json()
    console.log("🚀 ~ file: index.js ~ line 22 ~ fetcher ~ data", data)
    if (data.msg == "Not Authenticated") {
      throw new Error("User Not authenticated")
    }
    return data
  }
  const { data, error } = useSWR(["api/diary/?selectedDate=", selectedDate], fetcher)
  console.log("🚀 ~ file: index.js ~ line 27 ~ index ~ data", data)

  if (error) {
    return (
      <Container maxWidth={"container.xl"}>
        <Flex>
          <Box>{error.message}</Box>
        </Flex>
      </Container>
    )
  }
  if (!data) {
    return (
      <Container
        maxWidth={"full"}
        backgroundColor={"gray.700"}
        height={{ base: "full", md: "full", lg: "100vh" }}
      ></Container>
    )
  }
  return (
    <Container
      maxWidth={"full"}
      backgroundColor={"gray.700"}
      height={{ base: "full", md: "full", lg: "100vh" }}
    >
      <Container maxWidth={"container.xl"}>
        <Header />

        <Flex flexDirection={{ base: "column", lg: "row" }} gap={10}>
          <Box height={20} width={"300px"}>
            <Input
              onChange={(e) => setSelectedDate(e.target.value)}
              type={"date"}
              color={"blackAlpha.400"}
              sx={{ filter: "invert(1)" }}
              borderColor={"blackAlpha.700"}
              width={210}
              h={70}
              value={selectedDate}
            ></Input>
          </Box>
          <Box height={"90vh"} overflow={"auto"} scrollBehavior={"auto"} p={5}>
            <VStack>
              {data.map((entry, index) => (
                <Fade in={true} unmountOnExit={true}>
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
                </Fade>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Container>
  )
}
export default index
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    return {
      props: { session },
    }
  }
}
