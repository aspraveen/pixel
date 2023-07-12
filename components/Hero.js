import { Flex, Box, useColorModeValue, Link, Button, VStack, HStack, Text } from "@chakra-ui/react"
import { FaTwitter } from "react-icons/fa"
import NextImage from "next/image"
import { motion } from "framer-motion"
import Spotify from "./Spotify"

const Hero = ({ face }) => {
  const gradient = useColorModeValue("linear(to-r,orange,red )", "linear(to-r, #ff7b00, #ecca2f )")
  const MotionBox = motion(Box)
  const heading = "Hello! My name is Praveen. I am a Cloud Solutions Architect"
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
          fontSize={["3xl", "6xl", "6xl"]}
          fontFamily={"Inter"}
          bgGradient={gradient}
          bgClip="text"
          mt={[3, null, 7]}
          wrap={"wrap"}
          lineHeight={"1em"}
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
            Since the year 2000 (the dot-com era), I have worked on many web and e-commerce related
            projects using technologies such as Python, PHP (presently I am a big fan of Laravel),
            MySQL, and PostgreSQL. I have also worked with ASP.NET C# and SQL Server for a few
            clients. At present, I enjoy architecting solutions on the cloud.
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
            for tips and tricks I pick up while exploring new technologies.
          </Box>
        </Box>
      </MotionBox>
      <MotionRight variants={rightDisplay} initial={"initial"} animate={"animate"}>
        <NextImage
          src={`/assets/face${face}.png`}
          width={400}
          height={400}
          alt={"praveen avatar"}
        ></NextImage>
        <Spotify />
      </MotionRight>
    </Flex>
  )
}
export default Hero
