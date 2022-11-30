import {
  Container,
  Flex,
  Spacer,
  Box,
  animation,
  Image,
  usePrefersReducedMotion,
  keyframes,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
const Header = () => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
  const animation = prefersReducedMotion ? undefined : `${spin} infinite 20s linear`
  return (
    <Container maxWidth={"container.xl"} height={"50"} mb={"5"}>
      <Flex>
        <Box py={2} pt={{ base: 5, lg: 3 }}>
          <Link href={"/"}>
            {" "}
            <Image src={"/favicon-32x32.png"} animation={animation} ml={[0, 10]} />
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Text
            fontSize={{ base: "2xl", lg: "4xl" }}
            color={"gray.200"}
            fontFamily={"Inter"}
            pr={5}
            pt={{ base: 5, lg: 1 }}
            bgGradient="linear(to-l, #666666, #eeeeee
)"
            bgClip="text"
            textTransform={"uppercase"}
          >
            Diary
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}
export default Header
