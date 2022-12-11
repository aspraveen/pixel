import { authOptions } from "../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Container,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Box,
  Divider,
} from "@chakra-ui/react"
import Header from "../../components/diary/Header"
import { useState, useEffect } from "react"
import Display from "../../components/diary/Display"
import Calendar from "../../components/diary/Calendar"
import { FaPlus } from "react-icons/fa"
import Addnotes from "../../components/diary/Addnotes"
import TotalExpense from "../../components/diary/TotalExpense"
import EditNote from "../../components/diary/EditNote"
const index = () => {
  const dateString = new Date()
  const [selectedDate, setSelectedDate] = useState(dateString.toISOString().slice(0, 10))
  const handleSelectedDate = (dateFromCalenderComponent) => {
    setSelectedDate(dateFromCalenderComponent)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [totalExpense, setTotalExpense] = useState()

  return (
    <Container
      maxWidth={"full"}
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      height={{ base: "full", md: "full", lg: "100vh" }}
    >
      <Container maxWidth={"container.xl"}>
        <Header />

        <Flex
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          gap={2}
          justifyContent={"flex-start"}
        >
          <Calendar onClick={handleSelectedDate} />

          <Display selectedDate={selectedDate} setTotalExpense={setTotalExpense} />
          <Box>
            <Button
              onClick={onOpen}
              leftIcon={<FaPlus />}
              colorScheme={useColorModeValue("orange", "gray")}
              size={"lg"}
            >
              Add
            </Button>
            <Divider py={1} />
            <TotalExpense totalExpense={totalExpense} />
          </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Notes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Addnotes selectedDate={selectedDate} />
            </ModalBody>
            <ModalFooter>Click the + button for adding multiple notes.</ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Container>
  )
}
export default index
export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    return {
      props: { session },
    }
  }
}
