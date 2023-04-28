import {
  Container,
  Box,
  Heading,
  OrderedList,
  ListItem,
  useColorModeValue,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Seo from "../components/Seo"
import Link from "next/link"
import Image from "next/image"

const Uses = () => {
  const hoverBg = useColorModeValue("gray.200", "gray.600")
  const boxBgColor = useColorModeValue("orange.50", "gray.500")
  const boxHeadingColor = useColorModeValue("gray.600", "orange.400")
  return (
    <>
      <Seo
        title="Uses - Technologies &amp; gadgets I am using"
        description="This page lists the technologies and gadgets I am using in day to day life"
      />
      <Container maxW="container.xl">
        <Header />

        <Box>
          <Box p={5}>
            Technologies used for making this site include the following Next Js, Chakra UI, Prisma
            (ORM), Neon (Serverless Postgres), Next Auth ( for authentication) and hosted proudly on
            Vercel.
          </Box>
          <SimpleGrid columns={{ base: 2, md: 6, lg: 6 }} gap={5} p={5} spacingY={50}>
            <Image
              src={useColorModeValue("/chakra-light.svg", "/chakra-dark.svg")}
              width={100}
              height={50}
              alt="chakra ui"
            />
            <Image
              src={useColorModeValue("/next-dark.svg", "/next-light.svg")}
              width={100}
              height={50}
              alt="next js"
            />

            <Image
              src={useColorModeValue("/prisma-dark.svg", "/prisma-white.svg")}
              width={100}
              height={50}
              alt="prisma ORM"
            />
            <Image
              src={useColorModeValue("/neon-light.svg", "/neon-dark.svg")}
              width={100}
              height={50}
              alt="Neon db"
            />
            <Image
              src={useColorModeValue("/vercel-dark.png", "/vercel-light.png")}
              width={100}
              height={50}
              alt="vercel"
            />
            <Image
              src={useColorModeValue("/nauth-light.png", "/nauth-dark.png")}
              width={100}
              height={50}
              alt="Auth"
            />
          </SimpleGrid>
        </Box>
        <Divider py={2} />
        <Box padding={5}>
          As a software professional, I use a lot of technologies and gadgets. After getting
          inspiration from &nbsp;
          <Link href="https://wesbos.com/uses" target={"_blank"}>
            WesBos
          </Link>
          &nbsp;and his &nbsp;
          <Link href="https://uses.tech" target={"_blank"}>
            Uses.tech
          </Link>
          &nbsp;website, here are the tools and tech I use regularly.
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
          <Box
            p={5}
            fontSize={["sm", "md", "md"]}
            _hover={{ background: hoverBg, transition: "background-color 2s linear;" }}
            backgroundColor={boxBgColor}
            boxShadow={"lg"}
          >
            <Heading as="h4" size={["sm", "lg", "lg"]} color={boxHeadingColor}>
              Editors &amp; Terminal
            </Heading>
            <OrderedList mt={2}>
              <ListItem>
                Visual Studio Code is my default text editor. I love the plugin ecosystem of VSCode
              </ListItem>
              <ListItem>PHP Storm for PHP / Laravel development.</ListItem>
              <ListItem>PyCharm</ListItem>
              <ListItem>Android Studio</ListItem>
              <ListItem> iTerm </ListItem>
              <ListItem>Warp Terminal</ListItem>
            </OrderedList>
          </Box>

          <Box
            p={5}
            fontSize={["sm", "md", "md"]}
            _hover={{ background: hoverBg, transition: "background-color 2s linear;" }}
            backgroundColor={boxBgColor}
            boxShadow={"lg"}
          >
            <Heading as="h4" size={["sm", "lg", "lg"]} color={boxHeadingColor}>
              Gear
            </Heading>
            <OrderedList mt={2}>
              <ListItem>
                14″ MacBook Pro M1, 16 GB Ram - Lovely machine, I brought it after going through so
                many reviews and was about to buy M2 pro. Till then was using 13" Macbook pro.
              </ListItem>
              <ListItem>Iphone 13</ListItem>
              <ListItem>Ipad 7</ListItem>
              <ListItem>Apple Watch Series 5</ListItem>
              <ListItem>LG - 24" External Monitor</ListItem>
              <ListItem>Apple Magic Keyboard</ListItem>
              <ListItem>Apple Magic Trackpad</ListItem>
            </OrderedList>
          </Box>

          <Box
            p={5}
            fontSize={["sm", "md", "md"]}
            _hover={{ background: hoverBg, transition: "background-color 2s linear;" }}
            backgroundColor={boxBgColor}
            boxShadow={"lg"}
          >
            <Heading as="h4" size={["sm", "lg", "lg"]} color={boxHeadingColor}>
              Dev Tools
            </Heading>
            <OrderedList mt={2}>
              <ListItem>Docker </ListItem>
              <ListItem>Vagrant</ListItem>
              <ListItem>VMware Fusion</ListItem>
              <ListItem>GIT / GIT Desktop</ListItem>
              <ListItem>Ubuntu / Fedora / Windows 10 on (VM Ware Fusion)</ListItem>
            </OrderedList>
          </Box>

          <Box
            p={5}
            fontSize={["sm", "md", "md"]}
            _hover={{ background: hoverBg, transition: "background-color 2s linear;" }}
            backgroundColor={boxBgColor}
            boxShadow={"lg"}
          >
            <Heading as="h4" size={["sm", "lg", "lg"]} color={boxHeadingColor}>
              Hosting Providers
            </Heading>
            <OrderedList mt={2}>
              <ListItem>AWS </ListItem>
              <ListItem>Google Cloud</ListItem>
              <ListItem>Oracle Cloud</ListItem>
              <ListItem>Scaleway</ListItem>
              <ListItem>BuyVM</ListItem>
            </OrderedList>
          </Box>

          <Box
            p={5}
            fontSize={["sm", "md", "md"]}
            _hover={{ background: hoverBg, transition: "background-color 2s linear;" }}
            backgroundColor={boxBgColor}
            boxShadow={"lg"}
          >
            <Heading as="h4" size={["sm", "lg", "lg"]} color={boxHeadingColor}>
              Communication
            </Heading>
            <OrderedList mt={2}>
              <ListItem>Slack </ListItem>
              <ListItem>Discord</ListItem>
              <ListItem>Office 365 / Google Workspace</ListItem>
              <ListItem>Telegram</ListItem>
              <ListItem>Whatsapp</ListItem>
            </OrderedList>
          </Box>

          <Box
            p={5}
            fontSize={["sm", "md", "md"]}
            _hover={{ background: hoverBg, transition: "background-color 2s linear;" }}
            backgroundColor={boxBgColor}
            boxShadow={"lg"}
          >
            <Heading as="h4" size={["sm", "lg", "lg"]} color={boxHeadingColor}>
              Social
            </Heading>
            <OrderedList mt={2}>
              <ListItem>Twitter </ListItem>
              <ListItem>Facebook</ListItem>
              <ListItem>LinkedIn</ListItem>
              <ListItem>Instagram</ListItem>
              <ListItem>Swarm</ListItem>
              <ListItem>FourSquare</ListItem>
            </OrderedList>
          </Box>

          <Box
            p={5}
            fontSize={["sm", "md", "md"]}
            _hover={{ background: hoverBg, transition: "background-color 2s linear;" }}
            backgroundColor={boxBgColor}
            boxShadow={"lg"}
          >
            <Heading as="h4" size={["sm", "lg", "lg"]} color={boxHeadingColor}>
              Other Apps
            </Heading>
            <OrderedList mt={2}>
              <ListItem>Notion - to schedule my tasks and notes taking </ListItem>
              <ListItem>Evernote - I am a long time premium user of Evernote. </ListItem>
              <ListItem>Alfred - Cannot imagine a mac without Alfred</ListItem>
              <ListItem>Bartender - I don't like the huge number of icons on the bar</ListItem>
              <ListItem>Table Plus - For database management</ListItem>
            </OrderedList>
          </Box>
        </SimpleGrid>
        <Footer />
      </Container>
    </>
  )
}
export default Uses
