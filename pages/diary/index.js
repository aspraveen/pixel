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
import { useState, useEffect, createContext } from "react"
import Display from "../../components/diary/Display"
import Calendar from "../../components/diary/Calendar"
import { FaPlus } from "react-icons/fa"
import Addnotes from "../../components/diary/Addnotes"
import TotalExpense from "../../components/diary/TotalExpense"
import EditNote from "../../components/diary/EditNote"
export const NoteContext = createContext()

const index = () => {
  const dateString = new Date()
  const [selectedDate, setSelectedDate] = useState(dateString.toISOString().slice(0, 10))
  const handleSelectedDate = (dateFromCalenderComponent) => {
    setSelectedDate(dateFromCalenderComponent)
  }
  const { isOpen: addIsOpen, onOpen: addOnOpen, onClose: addOnClose } = useDisclosure()
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
  const [totalExpense, setTotalExpense] = useState()
  const [noteToEdit, setNoteToEdit] = useState()
  const closeModal = (modal) => {
    if (modal == "add") {
      addOnClose()
    }
  }
  useEffect(() => {
    noteToEdit != undefined ? editOnOpen() : editOnClose()
  }, [noteToEdit])
  return (
    <NoteContext.Provider value={[noteToEdit, setNoteToEdit]}>
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
                onClick={addOnOpen}
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
          {/* modal for adding */}
          <Modal isOpen={addIsOpen} onClose={addOnClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Notes</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Addnotes selectedDate={selectedDate} closeModal={closeModal} />
              </ModalBody>
              <ModalFooter>Click the + button for adding multiple notes.</ModalFooter>
            </ModalContent>
          </Modal>
          {/* modal for editing */}
          <Modal isOpen={editIsOpen} onClose={editOnClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Note</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditNote note={noteToEdit} />
              </ModalBody>
              <ModalFooter>Click the + button for adding multiple notes.</ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Container>
    </NoteContext.Provider>
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
