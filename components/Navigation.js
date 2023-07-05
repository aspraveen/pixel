import {
  HStack,
  useColorModeValue,
  Text,
  Box,
  SimpleGrid,
  Center,
  keyframes,
  usePrefersReducedMotion,
  Button,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon, UpDownIcon } from "@chakra-ui/icons"
import LoginStatus from "./LoginStatus"
import { useRouter } from "next/router"

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure(false)
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
          base: 0.98,
          md: 0.98,
          lg: 0.98,
          xl: 0.98,
        }}
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
        <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={10} py={5} px={10}>
          <Box height="10px" pb={2} textAlign={"center"}>
            <NextLink href={"/"}>
              <Text
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
                fontSize={"xl"}
                borderBottom={"1px"}
                borderBottomColor={currentPath == "/" ? "purple.300" : "orange.300"}
                borderBottomStyle={"dotted"}
              >
                Home
              </Text>
            </NextLink>
          </Box>

          <Box height="10px" pb={2} textAlign={"center"}>
            <NextLink href={"/about"}>
              <Text
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
                fontSize={"xl"}
                borderBottom={"1px"}
                borderBottomColor={currentPath == "/about" ? "purple.300" : "orange.300"}
                borderBottomStyle={"dotted"}
              >
                About
              </Text>
            </NextLink>
          </Box>

          <Box height="10px" p={2} textAlign={"center"}>
            <NextLink href={"/uses"}>
              <Text
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
                fontSize={"xl"}
                borderBottom={"1px"}
                borderBottomColor={currentPath == "/uses" ? "purple.300" : "orange.300"}
                borderBottomStyle={"dotted"}
              >
                Uses
              </Text>
            </NextLink>
          </Box>

          <Box height="10px" p={2} textAlign={"center"}>
            <NextLink href={"/blog"}>
              <Text
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
                fontSize={"xl"}
                borderBottom={"1px"}
                borderBottomColor={
                  currentPath == "/blog" || currentPath == "/blog/[slug]"
                    ? "purple.300"
                    : "orange.300"
                }
                borderBottomStyle={"dotted"}
              >
                Blog
              </Text>
            </NextLink>
          </Box>

          <Box height="10px" p={2} textAlign={"center"}>
            <NextLink href={"/contact"}>
              <Text
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
                fontSize={"xl"}
                borderBottom={"1px"}
                borderBottomColor={currentPath == "/contact" ? "purple.300" : "orange.300"}
                borderBottomStyle={"dotted"}
              >
                Contact
              </Text>
            </NextLink>
          </Box>

          <Box height="10px" p={2} textAlign={"center"}>
            <NextLink href={"/guests"}>
              <Text
                textDecorationThickness={3}
                textDecorationColor={linkUpperLineColor}
                fontSize={"xl"}
                borderBottom={"1px"}
                borderBottomColor={currentPath == "/guests" ? "purple.300" : "orange.300"}
                borderBottomStyle={"dotted"}
              >
                Guests
              </Text>
            </NextLink>
          </Box>
        </SimpleGrid>
        <Center>
          <Button
            onClick={onToggle}
            mt={10}
            leftIcon={<UpDownIcon />}
            colorScheme="orange"
            variant="solid"
            borderBottom={"1px"}
            borderBottomColor={"orange.300"}
            borderBottomStyle={"dotted"}
          >
            Close
          </Button>
        </Center>
      </Box>
    </>
  )
}
export default Navigation
