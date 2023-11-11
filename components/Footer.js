import {
  Container,
  Divider,
  Text,
  Box,
  usePrefersReducedMotion,
  Stack,
  Image,
  keyframes,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import { FaGithub, FaInstagram, FaLinkedin, FaSpotify } from "react-icons/fa"
import { RiTwitterXLine, RiThreadsFill } from "react-icons/ri"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = usePrefersReducedMotion()
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
  const animation = prefersReducedMotion ? undefined : `${spin} infinite 20s linear`
  const gradient = useColorModeValue(
    "linear(to-r, gray.100, orange.100, yellow.200)",
    "linear(to-r, gray.600, yellow.600, gray.700)",
  )
  return (
    <>
      <Divider mt={10}></Divider>

      <Container maxW="container.xl" py={2} bgGradient={gradient} borderRadius={"lg"}>
        <Flex direction={{ base: "column-reverse", md: "row" }}>
          <Container
            as={Stack}
            py={[5, null, 2]}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
            <Box height={20}>
              <Image src={"/favicon-32x32.png"} animation={animation} ml={10} />

              <Text fontSize={["xs", "sm", "sm"]} as="span">
                &copy; pixel
              </Text>
              <Text fontSize={["xs", "sm", "sm"]} color="orange.400" as="span">
                digit &nbsp;
              </Text>
              <Text fontSize={["xs", "sm", "sm"]} color="gray.400" as="span">
                {currentYear}
              </Text>
            </Box>
          </Container>
          <Container
            as={Stack}
            py={2}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "right" }}
            align={{ base: "center", md: "center" }}
            h={100}
            color={"orange.400"}
          >
            <Stack
              direction={"row"}
              spacing={6}
              fontSize={{ base: "lg", md: "2xl", lg: "3xl", xl: "3xl" }}
            >
              <Link
                href={
                  "https://open.spotify.com/user/rbbpft1sq5iohjqdr2zqx0i8z?si=c8107cce8e9b4c28&nd=1"
                }
                target="_blank"
              >
                <FaSpotify />
              </Link>
              <Link href={"https://twitter.com/aspraveen"} target="_blank">
                <RiTwitterXLine />
              </Link>
              <Link href={"https://linkedin.com/"} target="_blank">
                <FaLinkedin />
              </Link>
              <Link href={"https://github.com/aspraveen"} target="_blank">
                <FaGithub />
              </Link>
              <Link href={"https://instagram.com/"} target="_blank">
                <FaInstagram />
              </Link>
              <Link href={"https://www.threads.net/@praveen.as"} target="_blank">
                <RiThreadsFill />
              </Link>
            </Stack>
          </Container>
        </Flex>
      </Container>
    </>
  )
}
export default Footer
