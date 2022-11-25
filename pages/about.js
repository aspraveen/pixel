import {
  Container,
  Box,
  Text,
  Highlight,
  SimpleGrid,
  Heading,
  Badge,
  List,
  ListItem,
} from "@chakra-ui/react"
import NextImage from "next/image"
import Header from "../components/Header"
import { motion } from "framer-motion"
import Footer from "../components/Footer"
import Seo from "../components/Seo"

const About = () => {
  const MotionBox = motion(Box)
  return (
    <>
      <Seo title="PixelDigit aka. Praveen's Blog" />
      <Container maxW="container.xl">
        <Header />
        <SimpleGrid columns={[1, null, 3]} spacing="40px" mt={10}>
          <Box>
            <MotionBox
              transition={{ ease: "easeOut", duration: 2 }}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.8 }}
              mb={5}
            >
              <Heading size={["md", "lg", "lg"]}>
                <Highlight
                  query="Praveen's Blog"
                  styles={{
                    px: "2",
                    py: "2",
                    paddingTop: "1",
                    paddingBottom: "1",
                    bg: "orange.300",
                    rounded: "full",
                  }}
                >
                  Praveen's Blog, a.k.a PixelDigit is an attempt to share my thoughts and ideas with
                  you.
                </Highlight>
              </Heading>
            </MotionBox>
            <NextImage
              src={"/assets/developer.svg"}
              height={200}
              width={400}
              alt={"developer"}
            ></NextImage>
            <Text lineHeight={"180%"}>
              <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" mt={10} color={"orange.300"}>
                Idea behind the name.
              </Text>
              <Highlight
                query={["PIXEL DIGIT", "PIXEL", "DIGIT"]}
                styles={{ px: "2", py: "1", rounded: "full", bg: "gray.100" }}
              >
                I was in search for a creative name related to designing / programming rather than
                going with a conventional individual domain name. It ended up with PIXEL DIGIT where
                PIXEL is related to design and DIGIT to programming.
              </Highlight>
            </Text>
          </Box>

          <Box>
            <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" color={"orange.300"}>
              Career Path
            </Text>
            <List spacing={1}>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  2019 to present
                </Heading>
                Back to Bahrain.. and joined back my old employer as the Senior Systems Analyst.
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  2016 to 2019
                </Heading>
                Moved to Dubai ( UAE ) to join Loyalty Systems provider ‘Bebuzzd’ as their Senior
                System Analyst.
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  2010 to 2016
                </Heading>
                Worked as IT System Analyst with one of the leading business conglomerate in Kingdom
                of Bahrain.
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  2007 to 2010
                </Heading>
                Got Promoted as a Project Manager at Information Village and was mainly involved in
                projects with large corporate clients including Central Bank of Bahrain, Bahrain
                Duty Free, Ministry of Civil Aviation, Bahrain International Airport, Ahli United
                Bank, Social Insurance Organization &amp; CrediMax.
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  2004 to 2007
                </Heading>
                Joined Information Village (a leading web solutions company in Bahrain) as software
                developer.
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  2000 to 2004
                </Heading>
                Worked with Sesame Software Solutions software development house based at Kozhikode,
                Kerala , India as a senior programmer.
              </ListItem>
            </List>
          </Box>

          <Box>
            <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" color={"orange.300"}>
              Interests
            </Text>
            <Badge>Photography</Badge>, <Badge>Driving</Badge>, <Badge>Movies</Badge>,{" "}
            <Badge>Electronics</Badge>, <Badge>Linux</Badge>,
            <Badge>Exploring New Technologies</Badge>,<Badge>Gardening</Badge>
            <Box>
              <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" color={"orange.300"} mt={5}>
                Education
              </Text>
              Bachelor of Engineering (Mechanical)
              <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold" color={"orange.300"} mt={5}>
                Certifications
              </Text>
            </Box>
            <List spacing={1}>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  Oracle
                </Heading>
                Oracle Cloud Infrastructure - Certified Architect Associate
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  Google, Inc
                </Heading>
                Associate Cloud Engineer - Google Cloud
              </ListItem>

              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  Amazon Web Services
                </Heading>
                AWS Certified Solutions Architect (SAA)
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  NIT Calicut
                </Heading>
                Cyber Security &amp; Ethical Hacking
              </ListItem>
              <ListItem>
                <Heading as="h4" size="sm" pb={2} pt={2}>
                  Clarient Technolgies, USA
                </Heading>
                E-Commerce Specialist
              </ListItem>
            </List>
          </Box>
        </SimpleGrid>
        <Footer />
      </Container>
    </>
  )
}
export default About
