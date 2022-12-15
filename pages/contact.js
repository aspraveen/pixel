import { Container, Box, Flex } from "@chakra-ui/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RightDesign from "../components/RightDesign"
import ContactForm from "../components/ContactForm"
import Seo from "../components/Seo"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const Contact = () => {
  return (
    <>
      <Seo title="Contact Me" />
      <Container maxW="container.xl">
        <Header />
        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}
              scriptProps={{
                async: false, // optional, default to false,
                defer: true, // optional, default to false
                appendTo: "body", // optional, default to "head", can be "head" or "body",
                nonce: undefined,
              }}
            >
              <ContactForm />
            </GoogleReCaptchaProvider>
          </Box>
          <RightDesign height="600" title />
        </Flex>
        <Footer />
      </Container>
    </>
  )
}
export default Contact
