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
  const { data, error, isLoading } = useSWR("spotify", fetcher, { refreshInterval: 180000 })
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
  if (isLoading) {
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
  if (data.isPlaying) {
    return (
      <Box
        boxShadow={"base"}
        borderWidth="1px"
        borderColor={themeColor}
        borderRadius="lg"
        p={3}
        width={"90%"}
        my={2}
      >
        <Flex gap={6} alignItems="center">
          <FaSpotify size={30} color="#f5ad42" />
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
        </Flex>
      </Box>
    )
  } else {
    return (
      <Box
        boxShadow={"base"}
        borderWidth="1px"
        borderColor={themeColor}
        borderRadius="lg"
        p={3}
        my={2}
        width={"80%"}
      >
        <Flex gap={6} alignItems="center" alignContent={"stretch"}>
          <FaSpotify size={30} color="#f5ad42" />
          <Box width={"200px"}>
            <Text fontSize={["xs", null, "sm"]} color={themeColor}>
              I'm presently not listening to Spotify
            </Text>
          </Box>
        </Flex>
      </Box>
    )
  }
}
export default Spotify
