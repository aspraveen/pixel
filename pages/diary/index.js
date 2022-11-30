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
} from "@chakra-ui/react"

import useSWR from "swr"
import Footer from "../../components/Footer"
import Header from "../../components/diary/Header"
const index = () => {
  const fetcher = async (req, res) => {
    const response = await fetch("api/diary")
    const data = await response.json()
    console.log("🚀 ~ file: index.js ~ line 22 ~ fetcher ~ data", data)
    if (data.msg == "Not Authenticated") {
      throw new Error("User Not authenticated")
    }
    return data
  }
  const { data, error } = useSWR("diary", fetcher)
  console.log("🚀 ~ file: index.js ~ line 27 ~ index ~ data", data)

  if (error) {
    return (
      <Container maxWidth={"container.xl"}>
        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            {error.message}
          </Box>
        </Flex>
        <Footer />
      </Container>
    )
  }
  if (!data) {
    return (
      <Container maxWidth={"container.xl"}>
        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            Loading...
          </Box>
        </Flex>
        <Footer />
      </Container>
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

        <SimpleGrid spacing={1} columns={{ base: 1, lg: 2 }}>
          <Box height={20}>CONTROLS</Box>
          <Box height={"90vh"} overflow={"auto"} scrollBehavior={"auto"} p={5}>
            <VStack>
              {data.map((entry, index) => (
                <Box
                  key={index}
                  p={3}
                  fontFamily={"Open Sans"}
                  textTransform={"capitalize"}
                  rounded={"md"}
                  fontSize={"small"}
                  boxShadow={"base"}
                  width={"full"}
                >
                  <Box fontWeight={"bold"} color={"gray.600"}>
                    {entry.title}
                  </Box>
                  <Box color={"whiteAlpha.600"} lineHeight={"6"}>
                    {entry.details}
                  </Box>
                  <Flex>
                    <Box></Box>
                    <Box fontSize={"6xl"} color={"purple.400"}>
                      {entry.amount}
                    </Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
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
