import {
  Container,
  Box,
  Flex,
  HStack,
  Avatar,
  WrapItem,
  useColorModeValue,
  Button,
  Text,
} from "@chakra-ui/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RightDesign from "../components/RightDesign"
import Sign from "../components/Sign"
import Seo from "../components/Seo"
import { FaTrash } from "react-icons/fa"
import { useSession } from "next-auth/react"
import useSWR from "swr"
const Guests = () => {
  //entries = JSON.parse(entries)
  const borderColor = useColorModeValue("gray.100", "gray.600")

  const fetcher = async () => {
    const response = await fetch("/api/guestbook")
    const data = await response.json()
    return data
  }

  const { data, error, mutate } = useSWR("guestentries", fetcher)
  if (error) {
    return (
      <>
        <Seo title="Guest Book,If you like this website. Please leave a message." />
        <Container maxW="container.xl">
          <Header />

          <Flex>
            <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
              <Sign />
              Sorry an error occurred during data fetching.
            </Box>
            <RightDesign />
          </Flex>
          <Footer />
        </Container>
      </>
    )
  }
  if (!data) {
    return (
      <>
        <Seo title="Guest Book,If you like this website. Please leave a message." />
        <Container maxW="container.xl">
          <Header />

          <Flex>
            <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
              <Sign />
              .....
            </Box>
            <RightDesign />
          </Flex>
          <Footer />
        </Container>
      </>
    )
  }

  const Edit = ({ userId, id }) => {
    const unpublish = async (id) => {
      //const router = useRouter()
      const postPayLoad = {
        id,
      }
      try {
        const url = "/api/guestbook"
        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postPayLoad),
        })
        const result = await response.json()
        console.log("🚀 ~ file: guests.js ~ line 87 ~ unpublish ~ result", result.msg)
        if (result.msg == "done") {
          mutate()
        }
      } catch (err) {
        console.log(err)
      }
    }

    const session = useSession()
    if (session.status == "authenticated" && userId == session.data.userId) {
      return (
        <Button
          leftIcon={<FaTrash />}
          variant="outline"
          colorScheme={"gray"}
          size="xs"
          onClick={() => {
            unpublish(id)
          }}
        >
          Unpublish
        </Button>
      )
    }
  }
  return (
    <>
      <Seo title="Guest Book,If you like this website. Please leave a message." />
      <Container maxW="container.xl">
        <Header />

        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            <Sign />

            {data.map((entry) => (
              <Box
                width={"90%"}
                borderRadius="lg"
                boxShadow={"base"}
                borderWidth="1px"
                borderColor={borderColor}
                p={5}
                my={6}
                key={entry.id}
              >
                <Box pb={3}>{entry.comment}</Box>

                <HStack>
                  <WrapItem>
                    <WrapItem>
                      <Avatar size="xs" name={entry.user.name} src={entry.user.image} />{" "}
                    </WrapItem>
                  </WrapItem>
                  <Text
                    fontSize={["xs", "xs", "xs"]}
                    color="gray.500"
                    fontFamily="Open Sans"
                    textTransform={"uppercase"}
                  >
                    {entry.user.name}
                  </Text>

                  <Text fontSize={["xs", "xs", "xs"]} color="gray.400" fontFamily="Open Sans">
                    {new Date(entry.createdAt).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>

                  <Edit userId={entry.user.id} id={entry.id} />
                </HStack>
              </Box>
            ))}
          </Box>
          <RightDesign />
        </Flex>
        <Footer />
      </Container>
    </>
  )
}
export default Guests
/*export async function getServerSideProps() {

  let entries = await prisma.guestBook.findMany({
    where: {
      status: true,
    },
    orderBy: {
      id: "desc",
    },
    include: {
      user: true,
    },
  })
  entries = JSON.stringify(entries)

  return {
    props: { entries },
  }
}*/
