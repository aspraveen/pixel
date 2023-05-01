import { Container } from "@chakra-ui/react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Seo from "../components/Seo"

const IndexPage = (props) => {
  return (
    <>
      <Seo
        title="Welcome to PixelDigit - Praveen's Blog"
        description="I'm Praveen and I work as a software engineer as well as a technical consultant. Over the
          last 18 years, I have worked on several projects focusing on business improvements,
          customer service and value delivery."
      />

      <Container maxW="container.xl">
        <Header />
        <Hero face={props.randomFace} />
        <Footer />
      </Container>
    </>
  )
}
export const getServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "public,s-maxage=1200, stale-while-revalidate=800")
  //const randomFace = Math.floor(Math.random() * 8 + 1)
  const randomFace = new Date().getDay() + 1 //each day different face
  return {
    props: {
      randomFace: randomFace,
    },
  }
}

export default IndexPage
