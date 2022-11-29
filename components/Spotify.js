import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import Link from "next/link"
import { FaSpotify } from "react-icons/fa"
import useSWR from "swr"

const Spotify = () => {
  //spotify color #1ED760
  const themeColor = useColorModeValue("orange.200", "orange.400")
  const fetcher = async () => {
    const response = await fetch("/api/spotify")
    const data = await response.json()
    return data
  }
  const { data, error } = useSWR("spotify", fetcher, { refreshInterval: 180000 })
  if (error) {
    return (
      <Box
        boxShadow={"base"}
        borderWidth="1px"
        borderColor={themeColor}
        borderRadius="lg"
        p={2}
        width="90%"
      >
        <Flex gap={3} alignItems="center">
          <Text fontSize={["xs", null, "sm"]} color={themeColor}>
            Sorry, I couldn't get details from Spotify.
          </Text>
        </Flex>
      </Box>
    )
  }
  if (!data) {
    return (
      <Box
        boxShadow="base"
        borderWidth="1px"
        borderColor={themeColor}
        borderRadius="lg"
        p={2}
        width="90%"
      >
        <Flex gap={3} alignItems="center">
          <FaSpotify size={30} color="#f5ad42" />
          <Text fontSize={["xs", null, "sm"]} color={themeColor}>
            Loading
          </Text>
        </Flex>
      </Box>
    )
  }
  const audioType = data.audioType == "track" ? "song" : "podcast"
  return (
    <Box
      boxShadow={"base"}
      borderWidth="1px"
      borderColor={themeColor}
      borderRadius="lg"
      p={3}
      width="90%"
      my={2}
    >
      <Flex gap={3} alignItems="center">
        <FaSpotify size={30} color="#f5ad42" />
        <Box>
          <Text fontSize={["xs", null, "sm"]} color={themeColor}>
            {data.isPlaying
              ? `Listening to ${audioType}`
              : "I'm presently not listening to Spotify."}
          </Text>

          <Link href={data.isPlaying ? data.trackUrl : ""} target="_blank">
            <Text
              fontSize={["xs", null, "sm"]}
              color={useColorModeValue("orange.300", "orange.100")}
              fontWeight="bold"
            >
              {data.isPlaying && data.title}
            </Text>
          </Link>
          <Text fontSize={["xs", null, "sm"]} color={themeColor}>
            {data.isPlaying && data.album}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
export default Spotify
