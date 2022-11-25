import { Box, Flex, useColorModeValue, Divider, Spacer, useDisclosure } from "@chakra-ui/react"
import NextImage from "next/image"
import Navigation from "./Navigation"
import Link from "next/link"
const Header = () => {
  const logo = useColorModeValue("/assets/pixeldigit-dark.png", "/assets/pixeldigit-light.png")
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Flex justify={"space-between"} gap={2} alignItems="flex-start">
        <Link href={"/"}>
          <Box w={[110, 150, 150]} h={[50, 75, 75]} position="relative" mt={5} mr={[0, 0, 0, 5]}>
            <NextImage
              src={logo}
              fill
              alt={"pixel digit"}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </Box>
        </Link>
        <Navigation />
      </Flex>
      <Divider mb={2} />
    </>
  )
}
export default Header
