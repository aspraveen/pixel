import {
  Heading,
  Container,
  Text,
  Box,
  Flex,
  Avatar,
  Button,
  Spacer,
  Badge,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import RenderContents from "../../components/RenderContents"
import { prisma } from "../../util/db"
import useSWR from "swr"
import { useEffect } from "react"
import { HiHeart, HiChevronDoubleLeft } from "react-icons/hi"
import NextLink from "next/link"
import Footer from "../../components/Footer"
import Seo from "../../components/Seo"

export default function PostDetails({ post, categories }) {
  const router = useRouter()
  const randomPosition = Math.round(Math.random() * (2100 - 1200) + 1200)
  const avatarSize = useBreakpointValue({ base: "xs", md: "lg" })

  if (router.isFallback) {
    return <h2>Loading...</h2>
  }

  const fetcher = async () => {
    const response = await fetch(`/api/post-swr?postId=${post.id}`)
    const data = await response.json()
    return data
  }
  //record the count
  useEffect(() => {
    const asyncFn = async () => {
      const updateView = await fetch(`/api/post-update-fields?postId=${post.id}&fieldType=view`)
      const updateViewResult = await updateView.json()
      console.log(updateViewResult)
    }
    asyncFn()
  }, [])

  const likeit = async () => {
    const updateLike = await fetch(`/api/post-update-fields?postId=${post.id}&fieldType=like`)
    const updateLikeResult = await updateLike.json()
    console.log(updateLikeResult)
  }

  const { data, error } = useSWR("post", fetcher, { fallbackData: post })
  if (error) {
    return (
      <Container maxW="container.xl">
        <Header />
        <Box w="90%" mt={20}>
          An error occurred during the execution of this page. please try again later.
        </Box>
      </Container>
    )
  }
  if (!data) {
    return (
      <Container maxW="container.xl">
        <Header />
        <Box w="90%" mt={20}>
          Loading...
        </Box>
      </Container>
    )
  }

  return (
    <>
      <Seo title={data.title} />
      <Container maxW="container.xl">
        <Header />
        <Flex gap={2}>
          <Box w={{ base: "98%", md: "70%" }} mt={5}>
            <Flex align="center">
              <Box fontSize={["sm", "md", "md"]} fontStyle="italic" color="gray.500">
                {new Date(data.publishedAt).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Box>
              <Spacer />
              <NextLink href="/blog" passHref legacyBehavior>
                <Button
                  size="xs"
                  leftIcon={<HiChevronDoubleLeft />}
                  variant="outline"
                  mr={[2, 5, 5]}
                >
                  Back
                </Button>
              </NextLink>
            </Flex>

            <Heading as="h6" mt={5} mb={2} fontFamily="inter" fontSize={["xl", "4xl", "5xl"]}>
              {data.title}
            </Heading>
            <Box m={5} alignItems={"center"}>
              <Flex alignItems={"center"} gap={3}>
                <Avatar name={data.user.name} size={avatarSize}></Avatar>
                <Box>
                  <Text fontSize={["xs", "xs", "lg"]} color="gray.400" fontFamily="Open Sans">
                    {data.user.name}
                  </Text>
                  <Text fontSize={["xs", "xs", "sm"]} color="blue.400" fontFamily="Open Sans">
                    {data.user.twitter}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box fontSize={["sm", "lg", "lg"]} mb={10}>
              <RenderContents details={data.details} />
            </Box>
            <Text
              fontSize={"small"}
              textTransform="capitalize"
              color={"gray.400"}
              fontStyle="normal"
              my={5}
            >
              Posted under category: {data.category.name}
            </Text>
            <Flex>
              <Badge variant={"solid"} colorScheme="purple" rounded={"lg"} p={1} ml={2} size="xs">
                {data.views} Views
              </Badge>

              <Button
                size="xs"
                colorScheme="linkedin"
                leftIcon={<HiHeart />}
                ml={2}
                onClick={likeit}
              >
                {data.likes}
              </Button>
            </Flex>
          </Box>

          <Box
            width="25%"
            display={{
              base: "none",
              md: "block",
            }}
            backgroundImage={"url('/assets/vvvortex.svg')"}
            backgroundSize={randomPosition}
            height={"vh"}
            rounded="lg"
            backgroundPosition={(50, -100)}
            px={3}
          >
            <Heading as="h4" fontSize={["lg", "lg", "lg"]} py={5}>
              Blog Categories
            </Heading>
            <Wrap spacing={"2px"} align="center">
              {categories.map((item) => (
                <WrapItem>
                  <Badge
                    variant="outline"
                    colorScheme={item.name === data.category.name ? "orange" : "gray"}
                    mx={1}
                    my={1}
                  >
                    <NextLink href={`/blog/category/${item.name}`}>{item.name}</NextLink>
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Flex>
        <Footer />
      </Container>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  let data = await prisma.post.findFirst({
    where: {
      slug: slug,
    },
    include: {
      user: true,
      category: true,
    },
  })
  data = JSON.parse(JSON.stringify(data))
  const categories = await prisma.category.findMany()
  const categories_data = JSON.parse(JSON.stringify(categories))
  return {
    props: {
      post: data,
      categories: categories_data,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const data = await prisma.post.findMany()
  const paths = data.map((item) => ({
    params: {
      slug: item.slug,
    },
  }))
  return { paths, fallback: true }
}
