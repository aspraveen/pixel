import { Flex, Box, Heading, useColorModeValue, Link, Text, HStack, Button } from "@chakra-ui/react"
import { FaTwitter } from "react-icons/fa"
import NextImage from "next/image"
import { motion } from "framer-motion"
import Spotify from "./Spotify"

const Hero = ({ face }) => {
  const gradient = useColorModeValue("linear(to-r,orange,red )", "linear(to-r, #ff7b00, #ecca2f )")
  const MotionBox = motion(Box)
  return (
    <Flex
      alignItems={"center"}
      direction={{
        base: "column-reverse",
        md: "column-reverse",
        lg: "column-reverse",
        xl: "row",
      }}
      mb={5}
    >
      <MotionBox
        width={{ base: "100%", xl: "60%" }}
        transition={{ ease: "easeOut", duration: 2 }}
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.8 }}
        p={2}
        rounded={"lg"}
      >
        <Heading fontSize={["3xl", "5xl", "6xl"]} bgGradient={gradient} bgClip="text" mt={10}>
          Technical Consultant, Application Developer &amp; DevOps Engineer.
        </Heading>
        <Box mt={5}>
          Hello! 👋 My name is
          <Text
            fontWeight={"bold"}
            color={useColorModeValue("orange.300", "orange.100")}
            as="span"
            px={1}
            textTransform="uppercase"
          >
            Praveen
          </Text>
          and I work as a Technical Consultant, Application Developer, and DevOps Engineer.
          <Box mt={5}>
            Since the year 2000 ("the dot-com era"), I have worked with a couple of companies to
            improve their web and e-commerce platforms. My main tech stack includes Python (Django),
            PHP (especially Laravel), MySQL, and Postgres. I have also worked with ASP.net and SQL
            Server for some projects. Additionally, I enjoy architecting and managing solutions on
            the cloud, especially AWS. In my current work, I mainly focus on ORACLE-based
            technologies.
          </Box>
          <Box mt={5}>
            In order to thrive in today's dynamic and constantly changing IT landscape, I try to
            experiment with new technologies whenever I get an opportunity. This has led the way to
            redevelop and migrate this website from WordPress to JAMstack (React.js, Next.js, Prima
            & Chakra UI). I am also exploring WEB 3.0 and Chat GPT-related technologies whenever I
            have some free time.
          </Box>
          <Box mt={5}>
            If I am not doing any IT related stuff, you can find me watching NETFLIX, browsing
            Twitter or Listening to Podcasts or music.
          </Box>
          <Box mt={5}>
            Please follow me on
            <Button
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
              size={"sm"}
              mx={1}
              variant={"outline"}
            >
              <Link href={"https://twitter.com/aspraveen"} target="_blank">
                Twitter
              </Link>
            </Button>
            for the tips and tricks I pick up while exploring new technologies.
          </Box>
        </Box>
      </MotionBox>
      <Box textAlign={"center"} px={5}>
        <NextImage
          src={`/assets/face${face}.png`}
          width={400}
          height={400}
          alt={"praveen avatar"}
        ></NextImage>
        <Spotify />
      </Box>
    </Flex>
  )
}
export default Hero
