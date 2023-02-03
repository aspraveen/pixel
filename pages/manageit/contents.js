import {
  Container,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  Select,
  Flex,
  Button,
  Input,
} from "@chakra-ui/react"
import Header from "../../components/Header"
import { RichTextBlock } from "../../components/manageit/RichTextBlock"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { prisma } from "../../util/db"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

const { log } = console

const Contents = ({ categories, session }) => {
  const router = useRouter()
  const [title, setTitle] = useState()
  const [slug, setSlug] = useState()
  const [details, setDetails] = useState()
  const [publishedAt, setPublishedAt] = useState()
  const [intro, setIntro] = useState()
  const [status, setStatus] = useState("2")
  const [category, setCategory] = useState()

  const savePost = async () => {
    const contents = localStorage.getItem("content")
    const initialValue = JSON.parse(contents)
    setDetails(initialValue)

    //send to api
    const postPayLoad = {
      title,
      slug,
      intro,
      details,
      publishedAt,
      category,
    }

    try {
      const url = "/api/manageit/post"
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postPayLoad),
      })
      const result = await response.json()
      if (result.msg == "done") {
        // useEffect(() => {
        router.push("/manageit/list-contents")
        // }, [])
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (session) {
    const { isAdmin } = session
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
          <h2>Contents</h2>
          <Select
            placeholder="select category"
            onChange={({ target }) => setCategory(target?.value)}
          >
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </Select>
          <Input
            placeholder="Enter Title"
            mt={2}
            onChange={({ target }) => setTitle(target?.value)}
          />
          <Input
            placeholder="Enter Slug"
            mt={2}
            mb={2}
            onChange={({ target }) => setSlug(target?.value)}
          />
          <Textarea mt={2} mb={2} onChange={({ target }) => setIntro(target?.value)} />

          <Input
            type="date"
            mt={2}
            mb={2}
            onChange={({ target }) => setPublishedAt(target?.value)}
          />
          <RichTextBlock />
          <RadioGroup onChange={setStatus} value={status}>
            <Stack direction="row">
              <Radio value="1">Published</Radio>
              <Radio value="2"> Draft</Radio>
            </Stack>
          </RadioGroup>
          <Button
            name="Save"
            variant="outline"
            backgroundColor="gray.300"
            onClick={() => savePost()}
            mt={2}
          >
            Save
          </Button>
        </Container>
      )
    } else {
      return (
        <Container maxW="container.xl">
          <Header />
          <Container
            mt={100}
            bgColor={"gray.400"}
            p={[10, 200]}
            textAlign={"center"}
            maxWidth={"full"}
          >
            <Text color={"gray.300"} fontSize={["xl", "5xl", "5xl"]} textTransform={"uppercase"}>
              Not permitted.
            </Text>
          </Container>
        </Container>
      )
    }
  } else {
    return (
      <Container maxW="container.xl">
        <Header />
        <Container
          mt={100}
          bgColor={"gray.400"}
          p={[10, 200]}
          textAlign={"center"}
          maxWidth={"full"}
        >
          <Text color={"gray.300"} fontSize={["xl", "5xl", "5xl"]} textTransform={"uppercase"}>
            Please login to continue
          </Text>
        </Container>
      </Container>
    )
  }
}

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
    try {
      const categories = await prisma.category.findMany()
      const data = JSON.parse(JSON.stringify(categories))
      return {
        props: { categories: data, session },
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default Contents
