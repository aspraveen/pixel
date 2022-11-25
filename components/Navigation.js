import {
  HStack,
  useColorModeValue,
  Text,
  Box,
  SimpleGrid,
  Center,
  keyframes,
  usePrefersReducedMotion,
  Image,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon, ChevronLeftIcon } from "@chakra-ui/icons"
import LoginStatus from "./LoginStatus"
import { useRouter } from "next/router"

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure(false)
  const stackBorderColor = useColorModeValue("white", "gray.600")
  const menuBgColor = useColorModeValue("gray.100", "gray.800")
  const router = useRouter()
  const currentPath = router.pathname
  const linkUpperLineColor = "orange.300"
  const prefersReducedMotion = usePrefersReducedMotion()
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
  const animation = prefersReducedMotion ? undefined : `${spin} infinite 20s linear`

  return (
    <>
      <Box display={{ base: "none", xl: "block" }} mt={5}>
        <HStack spacing={6}>
          <NextLink href={"/"}>
            <Text
              p={currentPath == "/" ? 1 : 0}
              pl={currentPath == "/" ? 2 : 0}
              pr={currentPath == "/" ? 2 : 0}
              rounded="md"
              textDecoration={currentPath == "/" ? "overline" : "none"}
              textDecorationThickness={3}
              textDecorationColor={linkUpperLineColor}
            >
              Home
            </Text>
          </NextLink>
          <NextLink href={"/about"}>
            <Text
              p={currentPath == "/about" ? 1 : 0}
              pl={currentPath == "/about" ? 2 : 0}
              pr={currentPath == "/about" ? 2 : 0}
              rounded="md"
              textDecoration={currentPath == "/about" ? "overline" : "none"}
              textDecorationThickness={3}
              textDecorationColor={linkUpperLineColor}
            >
              About
            </Text>
          </NextLink>
          <NextLink href={"/uses"}>
            <Text
              p={currentPath == "/uses" ? 1 : 0}
              pl={currentPath == "/uses" ? 2 : 0}
              pr={currentPath == "/uses" ? 2 : 0}
              rounded="md"
              textDecoration={currentPath == "/uses" ? "overline" : "none"}
              textDecorationThickness={3}
              textDecorationColor={linkUpperLineColor}
            >
              Uses
            </Text>
          </NextLink>
          <NextLink href={"/blog"}>
            <Text
              p={currentPath == "/blog" || currentPath == "/blog/[slug]" ? 1 : 0}
              pl={currentPath == "/blog" || currentPath == "/blog/[slug]" ? 2 : 0}
              pr={currentPath == "/blog" || currentPath == "/blog/[slug]" ? 2 : 0}
              rounded="md"
              textDecoration={
                currentPath == "/blog" || currentPath == "/blog/[slug]" ? "overline" : "none"
              }
              textDecorationThickness={3}
              textDecorationColor={linkUpperLineColor}
            >
              Blog
            </Text>
          </NextLink>

          <NextLink href={"/contact"}>
            <Text
              p={currentPath == "/contact" ? 1 : 0}
              pl={currentPath == "/contact" ? 2 : 0}
              pr={currentPath == "/contact" ? 2 : 0}
              rounded="md"
              textDecoration={currentPath == "/contact" ? "overline" : "none"}
              textDecorationThickness={3}
              textDecorationColor={linkUpperLineColor}
            >
              Contact
            </Text>
          </NextLink>
          <NextLink href={"/guests"}>
            <Text
              p={currentPath == "/guests" ? 1 : 0}
              pl={currentPath == "/guests" ? 2 : 0}
              pr={currentPath == "/guests" ? 2 : 0}
              rounded="md"
              textDecoration={currentPath == "/guests" ? "overline" : "none"}
              textDecorationThickness={3}
              textDecorationColor={linkUpperLineColor}
            >
              Guests
            </Text>
          </NextLink>
          <LoginStatus />
        </HStack>
      </Box>
      <HamburgerIcon
        w={25}
        h={25}
        color={"gray.400"}
        display={{ base: "block", md: "block", lg: "block", xl: "none" }}
        onClick={onToggle}
        mt={30}
      />
      <Box
        height={"100%"}
        backgroundColor={"gray.400"}
        width={"100%"}
        position={"absolute"}
        left={0}
        top={0}
        visibility={{
          base: isOpen ? "visible" : "hidden",
          md: isOpen ? "visible" : "hidden",
          lg: isOpen ? "visible" : "hidden",
          xl: "hidden",
        }}
        bgColor={{
          base: menuBgColor,
          md: menuBgColor,
          lg: menuBgColor,
          xl: "transparent",
        }}
        opacity={{
          base: 0.95,
          md: 0.95,
          lg: 0.95,
          xl: 0.95,
        }}
        backgroundImage={"url('/assets/vvvortex.svg')"}
        backgroundSize={[2200, 3500]}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={(-500, -420)}
        zIndex={100}
      >
        <Box py={10}>
          <center>
            <LoginStatus />
          </center>
        </Box>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 3 }} spacing={10} py={5} px={10}>
          <Box height="80px" p={2} boxShadow={"base"} borderWidth="1px">
            <NextLink href={"/"}>
              <Text
                p={currentPath == "/" ? 1 : 0}
                pl={currentPath == "/" ? 2 : 0}
                pr={currentPath == "/" ? 2 : 0}
                rounded="md"
                textDecoration={currentPath == "/" ? "overline" : "none"}
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
              >
                Home
              </Text>
            </NextLink>
          </Box>

          <Box height="80px" p={2} boxShadow={"base"} borderWidth="1px">
            <NextLink href={"/about"}>
              <Text
                p={currentPath == "/about" ? 1 : 0}
                pl={currentPath == "/about" ? 2 : 0}
                pr={currentPath == "/about" ? 2 : 0}
                rounded="md"
                textDecoration={currentPath == "/about" ? "overline" : "none"}
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
              >
                About
              </Text>
            </NextLink>
          </Box>

          <Box height="80px" p={2} boxShadow={"base"} borderWidth="1px">
            <NextLink href={"/uses"}>
              <Text
                p={currentPath == "/uses" ? 1 : 0}
                pl={currentPath == "/uses" ? 2 : 0}
                pr={currentPath == "/uses" ? 2 : 0}
                rounded="md"
                textDecoration={currentPath == "/uses" ? "overline" : "none"}
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
              >
                Uses
              </Text>
            </NextLink>
          </Box>

          <Box height="80px" p={2} boxShadow={"base"} borderWidth="1px">
            <NextLink href={"/blog"}>
              <Text
                p={currentPath == "/blog" || currentPath == "/blog/[slug]" ? 1 : 0}
                pl={currentPath == "/blog" || currentPath == "/blog/[slug]" ? 2 : 0}
                pr={currentPath == "/blog" || currentPath == "/blog/[slug]" ? 2 : 0}
                rounded="md"
                textDecoration={
                  currentPath == "/blog" || currentPath == "/blog/[slug]" ? "overline" : "none"
                }
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
              >
                Blog
              </Text>
            </NextLink>
          </Box>

          <Box height="80px" p={2} boxShadow={"base"} borderWidth="1px">
            <NextLink href={"/contact"}>
              <Text
                p={currentPath == "/contact" ? 1 : 0}
                pl={currentPath == "/contact" ? 2 : 0}
                pr={currentPath == "/contact" ? 2 : 0}
                rounded="md"
                textDecoration={currentPath == "/contact" ? "overline" : "none"}
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
              >
                Contact
              </Text>
            </NextLink>
          </Box>

          <Box height="80px" p={2} borderWidth="1px" boxShadow={"base"}>
            <NextLink href={"/guests"}>
              <Text
                p={currentPath == "/guests" ? 1 : 0}
                pl={currentPath == "/guests" ? 2 : 0}
                pr={currentPath == "/guests" ? 2 : 0}
                rounded="md"
                textDecoration={currentPath == "/guests" ? "overline" : "none"}
                textDecorationColor={linkUpperLineColor}
              >
                Guests
              </Text>
            </NextLink>
          </Box>
        </SimpleGrid>
        <Center>
          <Box
            borderRadius={"full"}
            height={90}
            width={90}
            borderWidth={"2px"}
            py={6}
            px={6}
            onClick={onToggle}
            borderColor={"orange.200"}
          >
            <Image src={"/favicon-32x32.png"} animation={animation} />
            <Text fontSize={"x-small"}>CLOSE</Text>
          </Box>
        </Center>
      </Box>
    </>
  )
}
export default Navigation
