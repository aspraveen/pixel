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
} from "@chakra-ui/react"
import Header from "../../components/Header"
import useSWR from "swr"
import Footer from "../../components/Footer"
import RightDesign from "../../components/RightDesign"
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
        <Header />
        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            {error.message}
          </Box>
          <RightDesign />
        </Flex>
        <Footer />
      </Container>
    )
  }
  if (!data) {
    return (
      <Container maxWidth={"container.xl"}>
        <Header />
        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            Loading...
          </Box>
          <RightDesign />
        </Flex>
        <Footer />
      </Container>
    )
  }
  return (
    <Container maxWidth={"container.xl"}>
      <Header />
      <Wrap spacing={5}>
        {data.map((entry, index) => (
          <WrapItem>
            <Box
              key={index}
              p={3}
              width={{ lg: "290px" }}
              backgroundColor={useColorModeValue("gray.50", "gray.600")}
              fontFamily={"Open Sans"}
              textTransform={"capitalize"}
              rounded={"md"}
              fontSize={"small"}
              boxShadow={"base"}
            >
              <Box fontWeight={"bold"}>{entry.title}</Box>
              <Box>{entry.details}</Box>
              <Flex>
                <Box></Box>
                <Box fontSize={"6xl"} color={"purple.200"}>
                  {entry.amount}
                </Box>
              </Flex>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
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
