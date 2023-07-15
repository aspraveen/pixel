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
        description="Praveen have worked on many web and e-commerce related projects using technologies such as Python, PHP (Laravel), MySQL, and PostgreSQL. Praveen have also worked with ASP.NET C# and SQL Server for a few clients. At present, Praveen enjoy architecting solutions on the cloud."
      />

      <Container maxW="container.xl">
        <Header />
        <Hero />
        <Footer />
      </Container>
    </>
  )
}
/*export const getServerSideProps = async ({ res }) => {
  res.setHeader("Cache-Control", "public,s-maxage=1200, stale-while-revalidate=800")
  //const randomFace = Math.floor(Math.random() * 8 + 1)
  const randomFace = new Date().getDay() + 1 //each day different face
  return {
    props: {
      randomFace: randomFace,
    },
  }
}*/
export default IndexPage
