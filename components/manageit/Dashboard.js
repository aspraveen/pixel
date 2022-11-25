import { Box, Container, Flex, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
const Dashboard = () => {
  const session = useSession()

  if (session.status == "authenticated") {
    const {
      data: { isAdmin },
    } = session
    if (isAdmin) {
      return (
        <Container mt={100}>
          <Flex gap={10}>
            <Box w={250} border="2px" borderColor={"gray.100"} p={5} bgColor={"gray.200"}>
              <Link href="/manageit/list-contents">
                Edit Content
              </Link>
            </Box>
            <Box w={250} border="2px" borderColor={"gray.100"} p={5} bgColor={"gray.300"}>
              <Link href="/manageit/contents">
                Add New Content
              </Link>
            </Box>
            <Box w={250} border="2px" borderColor={"gray.100"} p={5} bgColor={"gray.400"}>
              <Link href="/manageit/media">
                Manage Media
              </Link>
            </Box>
          </Flex>
        </Container>
      );
    } else {
      return (
        <Container
          mt={100}
          bgColor={"gray.400"}
          p={[10, 200]}
          textAlign={"center"}
          maxWidth={"full"}
        >
          <Text color={"gray.300"} fontSize={["xl", "5xl", "5xl"]} textTransform={"uppercase"}>
            Not permitted.
          </Text>
        </Container>
      )
    }
  } else {
    return (
      <Container mt={100} bgColor={"gray.400"} p={[10, 200]} textAlign={"center"} maxWidth={"full"}>
        <Text color={"gray.300"} fontSize={["xl", "5xl", "5xl"]} textTransform={"uppercase"}>
          Please login to continue
        </Text>
      </Container>
    )
  }
}
export default Dashboard
