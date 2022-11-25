import { Flex, Box, Heading, useColorModeValue, Link, Text } from "@chakra-ui/react"
import NextImage from "next/image"
import { motion } from "framer-motion"
import create from "zustand"
import { persist } from "zustand/middleware"
import Spotify from "./Spotify"

const Hero = () => {
  const gradient = useColorModeValue("linear(to-r,orange,red )", "linear(to-r, #ff7b00, #ecca2f )")
  const useStore = create(
    persist(
      (set) => ({
        randomNumber: Math.floor(Math.random() * 8 + 1),
      }),
      {
        name: "random-face",
        getStorage: () => sessionStorage,
      },
    ),
  )
  const randomNumber = useStore((state) => state.randomNumber)

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
          Technical Consultant, Full Stack Developer &amp; DevOps Engg.
        </Heading>
        <Box mt={5}>
          👋 Hello, I'm
          <Text
            fontWeight={"bold"}
            color={useColorModeValue("orange.300", "orange.100")}
            as="span"
            px={1}
            textTransform="capitalize"
          >
            Praveen
          </Text>
          and I work as a software engineer as well as a technical consultant. Since Y2K, I have
          worked on several projects focusing on business improvements, customer service and value
          delivery.
          <Box mt={5}>
            Cloud Computing and experimenting with new technology are two things I am passionate
            about. Although, I've worked with different technologies over my career. Presently, my
            focus is on JAMstack especially NodeJS, ReactJS, NextJS and Prisma.
          </Box>
          <Box mt={5}>
            I want to share my thoughts and ideas on this blog. Also, don't forget to follow me
            on&nbsp;
            <Link href={"https://twitter.com/aspraveen"} target="_blank">
              <Text
                color={"orange.400"}
                as="u"
                _hover={{ background: "yellow.100", transition: "background-color 2s linear;" }}
              >
                Twitter
              </Text>
            </Link>
            &nbsp;for the tips and tricks I pick up while learning new technologies.
          </Box>
        </Box>
      </MotionBox>
      <Box>
        <NextImage
          src={`/assets/face${randomNumber}.png`}
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
