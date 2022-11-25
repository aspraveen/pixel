import {
  Box,
  Container,
  Button,
  Text,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
} from "@chakra-ui/react"
import { useSession, signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const Sign = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [message, SetMessage] = useState()
  const [alertMsg, setAlertMsg] = useState()
  const [alertType, setAlertType] = useState("error")
  const [hasSigned, setHasSigned] = useState(false)
  const borderColor = useColorModeValue("gray.100", "gray.600")

  useEffect(() => {
    setAlertMsg(null)
  }, [message])

  const signGuestbook = async (e) => {
    e.preventDefault()
    setAlertMsg(null)
    //validate form
    if (message === "" || message == null) {
      setAlertType("error")
      setAlertMsg("Enter Message")
      return false
    }
    if (message.length < 10) {
      setAlertType("error")
      setAlertMsg("Valid message is required (min 10 chars)")
      return false
    }
    const token = await executeRecaptcha()
    const postPayLoad = { message, token }
    try {
      const url = "/api/guestbook"
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayLoad),
      })
      const result = await response.json()
      if (response.status == "200") {
        setHasSigned(true)
        setAlertType("success")
        setAlertMsg("Thank you! details submitted")
      } else {
        setAlertType("error")
        setAlertMsg(result.msg)
      }
    } catch (err) {
      setAlertMsg("Failed to process " + err)
    }
  }
  const session = useSession()
  if (session.status == "authenticated") {
    return (
      <Container maxW={"container.xl"}>
        <Box
          boxShadow={"base"}
          width="90%"
          p={5}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
        >
          <Text>
            I will be privileged if you can leave a message on the guest book. Please login by
            clicking the button below to leave a message. Only your name will be displayed as part
            of comment.
          </Text>
          <form onSubmit={signGuestbook}>
            <Textarea
              my={5}
              placeholder="Enter your comment"
              onChange={({ target }) => SetMessage(target?.value)}
            ></Textarea>
            <Button
              variant="outline"
              colorScheme={"gray"}
              size="sm"
              type="submit"
              disabled={hasSigned && true}
            >
              Submit
            </Button>
          </form>
          <Alert
            status={alertType}
            variant="left-accent"
            visibility={alertMsg != null ? "visible" : "hidden"}
            my={2}
          >
            <AlertIcon />
            <AlertTitle>{alertType == "success" ? "Success" : "Sorry"}</AlertTitle>
            <AlertDescription>{alertMsg}</AlertDescription>
          </Alert>
        </Box>
      </Container>
    )
  } else {
    return (
      <Container maxW={"container.xl"}>
        <Box
          boxShadow={"base"}
          width="90%"
          p={5}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
        >
          <Text>
            I will be privileged if you can leave a message on the guest book. Please login by
            clicking the button below to leave a message. Only your name will be displayed as part
            of comment.
          </Text>
          <Button colorScheme="gray" variant="outline" size="xs" onClick={() => signIn()} my={5}>
            Sign In
          </Button>
        </Box>
      </Container>
    )
  }
}
export default Sign
