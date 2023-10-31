import { Flex, Box, useColorModeValue, Link, Button, VStack, HStack, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Spotify from "./Spotify"
import { RiTwitterXLine } from "react-icons/ri"

const Hero = ({ face }) => {
  const gradient = useColorModeValue("linear(to-r,orange,red )", "linear(to-r, #ff7b00, #ecca2f )")
  const MotionBox = motion(Box)
  const heading = "Hello! I am Praveen, a Cloud Architect."
  const MotionHStack = motion(HStack)
  const MotionText = motion(Text)
  const MotionRight = motion(VStack)
  const headingArrival = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.09,
      },
    },
  }
  const wordDisplay = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  }
  const rightDisplay = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
      },
    },
  }
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
        <MotionHStack
          fontSize={["4xl", "6xl", "6xl"]}
          fontFamily={"Inter"}
          bgGradient={gradient}
          bgClip="text"
          my={[5, 9, 9]}
          wrap={"wrap"}
          lineHeight={["0.7", "0.8", "0.8"]}
          variants={headingArrival}
          initial={"initial"}
          animate={"animate"}
        >
          {heading.split(" ").map((word, index) => (
            <MotionText key={index} variants={wordDisplay}>
              {word}&nbsp;
            </MotionText>
          ))}
        </MotionHStack>
        <Box mt={5}>
          <Box mt={5}>
            Since the turn of the millennium, during the dot-com era, I have been actively involved
            in numerous web and e-commerce projects. My core technology stack comprises Python, PHP,
            MySQL, Oracle, and PostgreSQL. I developed a strong affinity for Laravel since my
            initial engagement with the framework. Furthermore, I've gained experience in utilizing
            ASP.NET C# and SQL Server for select projects.
          </Box>
          <Box mt={5}>
            Currently, my main focus is on helping companies and enterprises migrate to the cloud.
          </Box>
          <Box mt={5}>
            In order to thrive in today's dynamic IT landscape, I try to experiment with new
            technologies whenever I get the opportunity. This led me to redevelop and migrate this
            blog from WordPress to JAMstack (React.js, Next.js, Prisma, and Chakra UI). I am also
            exploring WEB 3.0, machine learning, and artificial intelligence whenever I find some
            free time.
          </Box>
          <Box mt={5}>
            If I am not doing anything IT-related, you can find me watching Netflix, browsing
            Twitter, listening to podcasts, or listening to music.
          </Box>
          <Box mt={5}>
            Please follow me on
            <Button
              size={"xs"}
              mx={1}
              variant={"solid"}
              rounded={"md"}
              leftIcon={<RiTwitterXLine />}
              fontWeight={"normal"}
              color={"gray.500"}
            >
              <Link href={"https://twitter.com/aspraveen"} target="_blank">
                Twitter
              </Link>
            </Button>
            for tips and tricks I pick up while exploring new technologies.
          </Box>
        </Box>
      </MotionBox>
      <MotionRight variants={rightDisplay} initial={"initial"} animate={"animate"}>
        <Spotify />
      </MotionRight>
    </Flex>
  )
}
export default Hero
