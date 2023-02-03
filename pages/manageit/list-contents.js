import { EditIcon } from "@chakra-ui/icons"
import {
  Container,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Button,
  Flex,
} from "@chakra-ui/react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import Header from "../../components/Header"
import { prisma } from "../../util/db"
import { authOptions } from "../api/auth/[...nextauth]"

const listContents = ({ posts, session }) => {
  return (
    <>
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
        <TableContainer>
          <Table variant="striped">
            <TableCaption>Manage Posts</TableCaption>
            <Thead>
              <Tr>
                <Th>Post</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((post) => (
                <Tr key={post.id}>
                  <Td>{post.title}</Td>
                  <Td>
                    <Link href={`./slug/${post.slug}`} passHref>
                      <EditIcon />
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
export default listContents

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
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      title: true,
      slug: true,
      id: true,
    },
  })
  const data = JSON.parse(JSON.stringify(posts))
  return {
    props: { posts: data, session },
  }
}
