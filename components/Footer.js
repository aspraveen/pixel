import {
  Container,
  Divider,
  Text,
  Box,
  usePrefersReducedMotion,
  Stack,
  Image,
  keyframes,
} from "@chakra-ui/react"
import Link from "next/link"
import { FaGithub, FaInstagram, FaLinkedin, FaSpotify, FaTwitter } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = usePrefersReducedMotion()
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
  const animation = prefersReducedMotion ? undefined : `${spin} infinite 20s linear`
  return (
    <>
      <Divider mt={10}></Divider>
      <Container
        maxW="container.xl"
        backgroundImage={"url('/assets/vvvortex.svg')"}
        backgroundSize={1800}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={(20, 0)}
        py={2}
      >
        <Container
          as={Stack}
          maxW={"container.xl"}
          py={2}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "right" }}
          align={{ base: "center", md: "center" }}
          h={100}
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
              <FaTwitter />
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
          </Stack>
        </Container>

        <Container
          as={Stack}
          maxW={"container.xl"}
          py={[5, null, 2]}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Box height={50}>
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
          <Box height={50} alignContent={"baseline"} alignItems={"flex-end"} display={"flex"}>
            <Text fontSize={"xx-small"} fontStyle={"italic"}>
              Protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">&nbsp;Privacy Policy&nbsp;</a>
              and
              <a href="https://policies.google.com/terms">&nbsp;Terms of Service&nbsp;</a>
              apply.
            </Text>
          </Box>
        </Container>
      </Container>
    </>
  )
}
export default Footer
