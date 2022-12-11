import {
  Container,
  Flex,
  Spacer,
  Box,
  Image,
  usePrefersReducedMotion,
  keyframes,
} from "@chakra-ui/react"
import Link from "next/link"
import ColorModeSwitch from "../ColorModeSwitch"
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
        <Box py={2} pt={{ base: 2, lg: 3 }}>
          <Link href={"/"}>
            <Image src={"/favicon-32x32.png"} animation={animation} ml={[0, 2]} />
          </Link>
        </Box>

        <Spacer />
        <Box py={2} mr={{ base: 0, md: 20, lg: 20 }}>
          <ColorModeSwitch />
        </Box>
      </Flex>
    </Container>
  )
}
export default Header
