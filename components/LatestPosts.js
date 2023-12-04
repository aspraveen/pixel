import {
  Box,
  Stack,
  Skeleton,
  Flex,
  useColorModeValue,
  Avatar,
  useBreakpointValue,
  Heading,
  Button,
  Badge,
  Text,
} from "@chakra-ui/react"
import Spotify from "./Spotify"
import useSWR from "swr"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"

const BlogPosts = () => {
  const hoverBg = useColorModeValue("orange.200", "orange.600")
  const avatarSize = useBreakpointValue({ base: "xs", md: "sm" })

  const fetcher = async (url) => {
    const response = await fetch(`${url}`)
    const data = await response.json()
    return data
  }
  const { data, error, isLoading } = useSWR(`api/latest-posts/`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  if (error) {
    return <Box>{error.message}</Box>
  }
  if (isLoading) {
    return (
      <Box>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </Box>
    )
  }
  return data.map((post, sl) => (
    <Box key={sl}>
      <Box p={2} mb={5} boxShadow={"base"}>
        <Flex alignItems={"center"} gap={3}>
          <Avatar name={post.user.name} size={avatarSize} bg="orange.500"></Avatar>

          <Text fontSize={["xs", "xs", "md"]} color="gray.400" fontFamily="Open Sans">
            {post.user.name}
          </Text>

          <Text fontStyle={"italic"} color="gray.500" fontSize={["xs", "xs", "sm"]}>
            {new Date(post.publishedAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </Flex>
        <Heading as="h2" fontSize={["lg", "lg", "lg"]} mt={3}>
          {post.title}
        </Heading>
        <Text fontSize={["sm", "md", "md"]}>{post.intro}</Text>
        <Link href={`blog/${post.slug}`}>
          <Button size="xs" rightIcon={<HiArrowRight />} variant="outline" mr={[2, 5, 5]}>
            Read More
          </Button>
        </Link>
        <Flex gap={2} mt={2}>
          <Badge colorScheme={"orange"}>{post.views} Views</Badge>
          <Badge>{post.likes} Likes</Badge>
          <Badge colorScheme={"cyan"}>{post.category.name}</Badge>
        </Flex>
      </Box>
    </Box>
  ))
}

const LatestPosts = () => {
  return (
    <Box width={["100%", "98%", "98%", 400]} verticalAlign={"top"}>
      <BlogPosts />

      <Spotify />
    </Box>
  )
}
export default LatestPosts
