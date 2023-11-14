import { Box, Flex, Text, useColorModeValue, Button, Center } from "@chakra-ui/react"
import Link from "next/link"
import { FaSpotify } from "react-icons/fa"
import useSWR from "swr"

const Spotify = () => {
  //spotify color #1ED760
  const themeColor = useColorModeValue("orange.300", "orange.500")

  const fetcher = async () => {
    const response = await fetch("/api/spotify")
    const data = await response.json()
    return data
  }
  const { data, error, isLoading } = useSWR("spotify", fetcher, { refreshInterval: 180000 })
  if (error) {
    return (
      <>
        <Box
          boxShadow={"md"}
          borderWidth="1px"
          borderColor={themeColor}
          borderRadius="sm"
          p={2}
          width="100%"
        >
          <Text fontSize={["xs", null, "sm"]} color={themeColor}>
            Sorry, I couldn't get details from Spotify.
          </Text>
        </Box>
      </>
    )
  }
  if (isLoading) {
    return (
      <Button
        size={"lg"}
        mx={1}
        variant={"outline"}
        rounded={"md"}
        leftIcon={<FaSpotify />}
        fontWeight={"normal"}
        color={"orange.400"}
      >
        <Link
          href={"https://open.spotify.com/user/rbbpft1sq5iohjqdr2zqx0i8z?si=c8107cce8e9b4c28&nd=1"}
          target="_blank"
        >
          Spotify
        </Link>
      </Button>
    )
  }
  if (data.isPlaying) {
    const audioType = data.audioType == "track" ? "song" : "podcast"
    return (
      <>
        <Box
          boxShadow={"md"}
          borderWidth="1px"
          borderColor={themeColor}
          borderRadius="md"
          p={3}
          width={"100%"}
          my={2}
          fontSize={["xl", "xl", "3xl"]}
          color={"orange.200"}
        >
          <Flex gap={2}>
            <FaSpotify size={50} color="#f5ad42" /> <Text>Spotify</Text>{" "}
          </Flex>
          <Box>
            <Text fontSize={["xs", null, "sm"]} color={themeColor}>
              {`Listening to ${audioType}`}
            </Text>

            <Link href={data.trackUrl} target="_blank">
              <Text
                fontSize={["xs", null, "sm"]}
                color={useColorModeValue("orange.300", "orange.100")}
                fontWeight="bold"
              >
                {data.title}
              </Text>
            </Link>
            <Text fontSize={["xs", null, "sm"]} color={themeColor}>
              {data.album}
            </Text>
          </Box>
        </Box>
      </>
    )
  } else {
    return (
      <Box
        boxShadow={"lg"}
        borderWidth="1px"
        borderColor={themeColor}
        borderRadius="md"
        p={3}
        width={"100%"}
        my={2}
      >
        <Center>
          <Box fontSize={["xs", null, "sm"]} color={themeColor}>
            Please visit my Spotify for details.
          </Box>
          <Button
            size={"lg"}
            mx={1}
            variant={"ghost"}
            rounded={"md"}
            leftIcon={<FaSpotify />}
            fontWeight={"normal"}
            color={"orange.400"}
          >
            <Link
              href={
                "https://open.spotify.com/user/rbbpft1sq5iohjqdr2zqx0i8z?si=c8107cce8e9b4c28&nd=1"
              }
              target="_blank"
            >
              Spotify
            </Link>
          </Button>
        </Center>
      </Box>
    )
  }
}
export default Spotify
