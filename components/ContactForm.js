import {
  Box,
  Stack,
  Input,
  Textarea,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"
import { useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useEffect } from "react"
const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [mob, setMob] = useState()
  const [message, setMessage] = useState()

  const [alertMsg, setAlertMsg] = useState()
  const [alertType, setAlertType] = useState("error")

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  }

  useEffect(() => {
    setAlertMsg(null)
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAlertMsg(null)
    //validate form
    if (name === "" || name == null) {
      setAlertType("error")
      setAlertMsg("Enter Name")
      return false
    }
    if (name.length < 5) {
      setAlertType("error")
      setAlertMsg("Valid name is required (min 5 chars)")
      return false
    }
    if (email === "" || email == null) {
      setAlertType("error")
      setAlertMsg("Enter Email")
      return false
    }
    if (!validateEmail(email)) {
      setAlertType("error")
      setAlertMsg("Valid email is required")
      return false
    }
    //get token
    const token = await executeRecaptcha()
    //send to api
    const postPayLoad = {
      name,
      email,
      mob,
      message,
      token,
    }
    try {
      const url = "/api/post-contact"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postPayLoad),
      })
      const result = await response.json()
      if (response.status == "200") {
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

  return (
    <Box>
      <Box mt={10}>
        <Text fontSize={{ base: "sm", md: "xl", xl: "xl" }}>
          Please feel free to contact me at praveen (at) pixeldigit.com.
        </Text>
        <Text fontStyle={"italic"} mt={5}>
          Or please fill the form so that I can get back to you.
        </Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mt={10} width={[350, 500, 500]}>
          <Stack spacing={3}>
            <Input placeholder="Your Name" onChange={({ target }) => setName(target?.value)} />
            <Input placeholder="Email Id" onChange={({ target }) => setEmail(target?.value)} />
            <Input placeholder="Mobile Number" onChange={({ target }) => setMob(target?.value)} />
            <Textarea
              placeholder="Your Message"
              onChange={({ target }) => setMessage(target?.value)}
            />
            <Button variant={"outline"} colorScheme="gray" size={"sm"} width={200} type="submit">
              Submit
            </Button>
            <Text fontSize={"xx-small"} fontStyle={"italic"}>
              This form is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">&nbsp;Privacy Policy&nbsp;</a>
              and
              <a href="https://policies.google.com/terms">&nbsp;Terms of Service&nbsp;</a>
              apply.
            </Text>
            <Alert
              status={alertType}
              variant="left-accent"
              visibility={alertMsg != null ? "visible" : "hidden"}
            >
              <AlertIcon />
              <AlertTitle>{alertType == "success" ? "Success" : "Sorry"}</AlertTitle>
              <AlertDescription>{alertMsg}</AlertDescription>
            </Alert>
          </Stack>
        </Box>
      </form>
    </Box>
  )
}
export default ContactForm
