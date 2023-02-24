import { Container, Box } from "@chakra-ui/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Seo from "../components/Seo"
import Link from "next/link"
import Image from "next/image"

const notFoundPage = () => {
  return (
    <>
      <Seo title="PixelDigit aka. Praveen's Blog" />
      <Container maxW="container.xl">
        <Header />
        <Box py={20} h={[500, 600, 600]}>
          <Image src={"/404.svg"} height={300} width={400} alt={"404 page not found"}></Image>
          <Box py={10} color={"gray.400"}>
            OOPS! this page was not found on this site. Please visit the{" "}
            <Link href={"/"}> Home Page</Link> to browse the links.
            <p mb={20}>
              Maybe the link has been updated due to the recent upgrade to the JAM stack site from
              old wordpress installation.
            </p>
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  )
}
export default notFoundPage
