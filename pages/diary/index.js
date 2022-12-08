import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"
import { Container, Input, Box, Flex } from "@chakra-ui/react"
import useSWR from "swr"
import Header from "../../components/diary/Header"
import { useState } from "react"
import Display from "../../components/diary/Display"
import Calendar from "../../components/diary/Calendar"
const index = () => {
  const dateString = new Date()
  const [selectedDate, setSelectedDate] = useState(dateString.toISOString().slice(0, 10))
  const handleSelectedDate = (selectedDate) => {
    console.log("🚀 ~ file: index.js:13 ~ handleSelectedDate ~ date", selectedDate)
    setSelectedDate(selectedDate)
  }
  console.log("🚀 ~ file: index.js:34 ~ index ~ transDate", selectedDate)
  const fetcher = async (url, selectedDate) => {
    console.log("🚀 ~ file: index.js:35 ~ fetcher ~ transDate", selectedDate)
    //const response = await fetch(`${url}${selectedDate}`)
    const response = await fetch(`${url}${dateString.toISOString().slice(0, 10)}`)
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
            <Calendar onChange={handleSelectedDate} />
          </Box>
          <Display data={data} />
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
