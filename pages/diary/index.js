import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
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
  Kbd,
  VStack,
} from "@chakra-ui/react"
import Header from "../../components/diary/Header"
import { useState, useEffect, createContext, useRef, useCallback } from "react"
import Display from "../../components/diary/Display"
import Calendar from "../../components/diary/Calendar"
import Addnotes from "../../components/diary/Addnotes"
import EditNote from "../../components/diary/EditNote"
import History from "../../components/diary/History"
import { CalendarIcon, PlusSquareIcon, SearchIcon, TimeIcon } from "@chakra-ui/icons"
import Expenses from "../../components/diary/Expenses"
import Search from "../../components/diary/Search"
export const NoteContext = createContext()
const DisplayForDay = ({ date }) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  let day = new Date(date).getDate()
  let month = new Date(date).getMonth()
  //return day + "," + months[month]
  return (
    <>
      <Flex>
        <Box fontSize={"xl"} p={1}>
          Previous Years on
        </Box>

        <Box
          fontSize={"lg"}
          borderBottomWidth={2}
          borderBottomColor={"pink.200"}
          rounded={"md"}
          p={1}
          width={110}
        >
          {months[month]}
        </Box>
        <Box
          ml={2}
          fontSize={"lg"}
          borderBottomWidth={2}
          borderBottomColor={"purple.200"}
          rounded={"md"}
          p={1}
          width={90}
        >
          {day}
        </Box>
      </Flex>
    </>
  )
}
const ExpForMonth = ({ date }) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  let month = new Date(date).getMonth()
  let year = new Date(date).getFullYear()
  //return day + "," + months[month]
  return (
    <>
      <Flex>
        <Box fontSize={"xl"} p={1}>
          Expenses for
        </Box>

        <Box
          fontSize={"lg"}
          borderBottomWidth={2}
          borderBottomColor={"pink.200"}
          rounded={"md"}
          p={1}
          width={110}
        >
          {months[month]}
        </Box>
        <Box
          ml={2}
          fontSize={"lg"}
          borderBottomWidth={2}
          borderBottomColor={"purple.200"}
          rounded={"md"}
          p={1}
          width={75}
        >
          {year}
        </Box>
      </Flex>
    </>
  )
}
const index = () => {
  const dateString = new Date()
  const [selectedDate, setSelectedDate] = useState(dateString.toISOString().slice(0, 10))
  const handleSelectedDate = (dateFromCalenderComponent) => {
    setSelectedDate(dateFromCalenderComponent)
  }
  const { isOpen: addIsOpen, onOpen: addOnOpen, onClose: addOnClose } = useDisclosure()
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
  const { isOpen: historyIsOpen, onOpen: historyOnOpen, onClose: historyOnClose } = useDisclosure()
  const { isOpen: expIsOpen, onOpen: expOnOpen, onClose: expOnClose } = useDisclosure()
  const { isOpen: searchIsOpen, onOpen: searchOnOpen, onClose: searchOnClose } = useDisclosure()
  const [noteToEdit, setNoteToEdit] = useState()
  const dataRefresh = useRef(null)
  const handleKeypress = useCallback((e) => {
    if (e.ctrlKey && e.key == "S") {
      searchOnOpen()
    } else if (e.ctrlKey && e.key == "N") {
      addOnOpen()
    } else if (e.ctrlKey && e.key == "H") {
      historyOnOpen()
    } else if (e.ctrlKey && e.key == "E") {
      expOnOpen()
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress)
    return () => {
      document.removeEventListener("keydown", handleKeypress)
    }
  }, [handleKeypress])

  const closeModal = (modal) => {
    //console.log("🚀 ~ file: index.js:43 ~ closeModal ~ modal:", modal)
    if (modal == "add") {
      addOnClose()
      dataRefresh.current.mutateDataOnClose()
    } else if (modal == "edit") {
      editOnClose()
      dataRefresh.current.mutateDataOnClose()
    }
  }
  useEffect(() => {
    noteToEdit != undefined ? editOnOpen() : editOnClose()
  }, [noteToEdit])

  return (
    <NoteContext.Provider value={[noteToEdit, setNoteToEdit]}>
      <Container
        maxWidth={"full"}
        backgroundColor={useColorModeValue("gray.50", "gray.700")}
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
            <Box
              height={"90vh"}
              overflow={"auto"}
              scrollBehavior={"auto"}
              p={5}
              width={{ base: "sm", md: "md", lg: "lg", xl: "820px" }}
            >
              <Display selectedDate={selectedDate} ref={dataRefresh} />
            </Box>

            <VStack>
              <Button
                onClick={addOnOpen}
                leftIcon={<PlusSquareIcon />}
                size={"lg"}
                width={["90%", null, 200]}
                fontFamily={"montserrat"}
                fontWeight={"light"}
              >
                Add
              </Button>
              <Button
                onClick={historyOnOpen}
                leftIcon={<CalendarIcon />}
                size={"lg"}
                my={2}
                width={["90%", null, 200]}
                fontFamily={"montserrat"}
                fontWeight={"light"}
              >
                History
              </Button>
              <Button
                onClick={expOnOpen}
                leftIcon={<TimeIcon />}
                size={"lg"}
                my={2}
                width={["90%", null, 200]}
                fontFamily={"montserrat"}
                fontWeight={"light"}
              >
                Expenses
              </Button>
              <Button
                onClick={searchOnOpen}
                leftIcon={<SearchIcon />}
                size={"lg"}
                my={2}
                width={["90%", null, 200]}
                fontFamily={"montserrat"}
                fontWeight={"light"}
              >
                Search
              </Button>
            </VStack>
          </Flex>
          {/* modal for adding */}
          <Modal isOpen={addIsOpen} onClose={addOnClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box
                  fontFamily={"montserrat"}
                  color={"gray.300"}
                  fontSize={"xl"}
                  fontWeight={"light"}
                >
                  Add Notes
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Addnotes selectedDate={selectedDate} closeModal={closeModal} />
              </ModalBody>
              <ModalFooter>
                <span>
                  <Kbd>Ctrl</Kbd>+<Kbd>N</Kbd>
                </span>
                &nbsp; or + button for adding multiple notes.
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* modal for editing */}
          <Modal isOpen={editIsOpen} onClose={editOnClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box
                  fontFamily={"montserrat"}
                  color={"gray.300"}
                  fontSize={"xl"}
                  fontWeight={"light"}
                >
                  Edit Note
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <EditNote note={noteToEdit} closeModal={closeModal} />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
          {/* modal for historical data */}
          <Modal isOpen={historyIsOpen} onClose={historyOnClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box
                  fontFamily={"montserrat"}
                  color={"gray.300"}
                  fontSize={"xl"}
                  fontWeight={"light"}
                >
                  <DisplayForDay date={selectedDate} />
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <History selectedDate={selectedDate} closeModal={closeModal} />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
          {/* modal for expense */}
          <Modal isOpen={expIsOpen} onClose={expOnClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box
                  fontFamily={"montserrat"}
                  color={"gray.300"}
                  fontSize={"xl"}
                  fontWeight={"light"}
                >
                  <ExpForMonth date={selectedDate} />
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Expenses selectedDate={selectedDate} closeModal={closeModal} />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
          {/* modal for search */}
          <Modal isOpen={searchIsOpen} onClose={searchOnClose} size="full">
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <Search />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Container>
    </NoteContext.Provider>
  )
}
export default index
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
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
