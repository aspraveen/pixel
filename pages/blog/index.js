import {
  Text,
  Heading,
  Container,
  Box,
  Flex,
  Badge,
  Avatar,
  useBreakpointValue,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import Header from "../../components/Header"
import NextLink from "next/link"
import { prisma } from "../../util/db"
import { HiArrowRight } from "react-icons/hi"
import Footer from "../../components/Footer"
import Seo from "../../components/Seo"

export default function Post({ posts, categories }) {
  const avatarSize = useBreakpointValue({ base: "xs", md: "sm" })
  const randomPosition = Math.round(Math.random() * (2100 - 1200) + 1200)

  return (
    <>
      <Seo
        title="Pixel Digit Blog"
        description="Here i write something I am interested in. Also learn the tips and tricks I pick up while learning new technologies"
      />
      <Container maxW="container.xl">
        <Header />
        <Flex>
          <Box w={{ base: "98%", md: "75%" }} mt={10} p={[2, 5, 5]}>
            {posts.map((post) => (
              <Box key={post.id} p={2} mb={5} boxShadow={"base"}>
                <Flex alignItems={"center"} gap={3}>
                  <Avatar name={post.user.name} size={avatarSize} bg="orange.500"></Avatar>
                  <Box>
                    <Text fontSize={["xs", "xs", "lg"]} color="gray.400" fontFamily="Open Sans">
                      {post.user.name}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontStyle={"italic"} color="gray.500">
                      {new Date(post.publishedAt).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </Box>
                </Flex>
                <Heading as="h2" fontSize={["xl", "xl", "2xl"]} mt={3}>
                  {post.title}
                </Heading>
                <Text fontSize={["sm", "lg", "lg"]}>{post.intro}</Text>
                <NextLink href={`blog/${post.slug}`} passHref legacyBehavior>
                  <Button size="xs" rightIcon={<HiArrowRight />} variant="outline" mr={[2, 5, 5]}>
                    Read More
                  </Button>
                </NextLink>
                <Flex gap={2} mt={2}>
                  <Badge colorScheme={"orange"}>{post.views} Views</Badge>
                  <Badge>{post.likes} Likes</Badge>
                  <Badge colorScheme={"cyan"}>{post.category.name}</Badge>
                </Flex>
              </Box>
            ))}
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
              {categories.map((category) => (
                <WrapItem key={category.id}>
                  <Badge
                    variant="outline"
                    colorScheme="gray"
                    mx={1}
                    my={1}
                    fontFamily={"montserrat"}
                    fontWeight={"hairline"}
                  >
                    <NextLink href={`/blog/category/${category.name}`}>{category.name}</NextLink>
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

export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    where: {
      status: 1,
    },
    select: {
      publishedAt: true,
      title: true,
      intro: true,
      views: true,
      likes: true,
      slug: true,
      id: true,
      user: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  })

  const data = JSON.parse(JSON.stringify(posts))

  const categories = await prisma.category.findMany()
  const categories_data = JSON.parse(JSON.stringify(categories))

  return {
    props: { posts: data, categories: categories_data },
    revalidate: 10,
  }
}
