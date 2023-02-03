import { Container, Text, Flex, Button } from "@chakra-ui/react"
import Header from "../../components/Header"
import UploadImage from "../../components/manageit/UploadImage"
import ListImages from "../../components/manageit/ListImages"
import Link from "next/link"
import { useRef } from "react"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"

const Media = ({ session }) => {
  console.log("🚀 ~ file: media.js ~ line 10 ~ Media ~ session", session)
  const listImageRef = useRef()

  const updateListImageState = () => {
    listImageRef.current.refreshGrid()
  }
  if (session) {
    const { isAdmin } = session
    console.log("🚀 ~ file: media.js ~ line 18 ~ Media ~ isAdmin", isAdmin)
    if (isAdmin) {
      return (
        <Container maxW="container.xl">
          <Header />
          <Flex gap={5}>
            <Link href={"/manageit/"}>
              <Button py={7}>Dashboard</Button>
            </Link>
            <Link href={"/manageit/contents"}>
              <Button py={7}>Add New Post</Button>
            </Link>
            <Link href={"/manageit/media"}>
              <Button py={7}>Media</Button>
            </Link>
          </Flex>
          <ListImages ref={listImageRef} />
          {session && <UploadImage updatelistimagestate={() => updateListImageState()} />}
        </Container>
      )
    }
  }
}
export default Media
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
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
