import {
  Container,
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
  Flex,
} from "@chakra-ui/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RightDesign from "../components/RightDesign"
import ContactForm from "../components/ContactForm"
import Seo from "../components/Seo"

const Contact = () => {
  return (
    <>
      <Seo title="Contact Me" />
      <Container maxW="container.xl">
        <Header />
        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            <ContactForm />
          </Box>
          <RightDesign height="600" title />
        </Flex>
        <Footer />
      </Container>
    </>
  )
}
export default Contact
