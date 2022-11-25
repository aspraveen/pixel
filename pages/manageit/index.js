import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"
import { Container } from "@chakra-ui/react"
import Header from "../../components/Header"
import Dashboard from "../../components/manageit/Dashboard"
const Index = () => {
  return (
    <Container maxW="container.xl">
      <Header />
      <Dashboard />
    </Container>
  )
}
export default Index
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    if (session.isAdmin != true) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }
  return {
    props: { session },
  }
}
