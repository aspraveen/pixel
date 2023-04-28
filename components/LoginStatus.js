import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Box, Button, Flex, Heading, Spacer, useColorModeValue } from "@chakra-ui/react"
import ColorModeSwitch from "./ColorModeSwitch"
import Link from "next/link"
import { CalendarIcon } from "@chakra-ui/icons"
const FirstName = ({ name }) => {
  let fnameArray = name.split(" ")
  return fnameArray[0]
}
const LoginStatus = (props) => {
  const session = useSession()
  const boxBgColor = useColorModeValue("gray.50", "gray.600")
  if (session.status == "authenticated") {
    const {
      data: {
        user: { image: profilePic },
      },
    } = session
    const {
      data: {
        user: { name: userName },
      },
    } = session
    const {
      data: { isAdmin },
    } = session

    return (
      <Box
        height={50}
        overflow={"hidden"}
        width={280}
        p={2}
        borderRadius="lg"
        boxShadow={"base"}
        borderWidth="1px"
        borderColor={boxBgColor}
      >
        <Flex alignItems={"center"} gap={3}>
          {isAdmin ? (
            <Link href="/manageit">
              <Avatar name={userName} src={profilePic} size="sm" />
            </Link>
          ) : (
            <Avatar name={userName} src={profilePic} size="sm" />
          )}
          <Heading
            as="h6"
            fontSize={["xs", "xs", "xs"]}
            textTransform={"capitalize"}
            color="gray.400"
            fontFamily="Open Sans"
          >
            <FirstName name={userName} />
          </Heading>
          <Spacer />
          <Button colorScheme="gray" variant="outline" size="xs" onClick={() => signOut()}>
            Sign Out
          </Button>
          <Spacer />
          <Link href="/diary">
            <CalendarIcon />
          </Link>
          <Spacer />
          <ColorModeSwitch zIndex="50" />
        </Flex>
      </Box>
    )
  } else {
    return (
      <Box
        height={50}
        overflow={"hidden"}
        width={280}
        p={2}
        borderRadius="lg"
        boxShadow={"base"}
        borderWidth="1px"
        borderColor={boxBgColor}
      >
        <Flex alignItems={"center"} gap={3}>
          <Avatar name="Guest" size="sm" />
          <Heading
            as="h6"
            fontSize={["xs", "xs", "sm"]}
            textTransform={"uppercase"}
            color="gray.400"
            fontFamily="Open Sans"
          >
            Guest
          </Heading>
          <Spacer />
          <Button colorScheme="gray" variant="outline" size="xs" onClick={() => signIn()}>
            Sign In
          </Button>
          <Spacer />
          <ColorModeSwitch zIndex="50" />
        </Flex>
      </Box>
    )
  }
}
export default LoginStatus
