import {
  Box,
  VStack,
  Flex,
  useColorModeValue,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa"
import { useState, useEffect } from "react"
import useSWR from "swr"
import EditNote from "./EditNote"
const SelectNote = ({ note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [noteToEdit, setNoteToEdit] = useState()
  console.log("🚀 ~ file: Display.js:27 ~ DisplayDiary ~ noteToEdit", noteToEdit)
  const handleClick = (note) => {
    setNoteToEdit(note)
    onOpen()
  }

  return (
    <>
      <IconButton
        colorScheme="orange"
        aria-label="edit"
        size="sm"
        icon={<FaEdit />}
        onClick={() => handleClick(note)}
      ></IconButton>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditNote note={noteToEdit} />
          </ModalBody>
          <ModalFooter>Click the + button for adding multiple notes.</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
const DisplayDiary = (props) => {
  const data = props.data
  const diaryDate = new Date(props.diaryDate).toDateString()

  return (
    <Box height={"90vh"} overflow={"auto"} scrollBehavior={"auto"} p={5}>
      <VStack alignItems="flex-start">
        <Heading pl={2} color={"gray.500"} as="h4" size={"lg"}>
          {diaryDate}
        </Heading>
        <Box width={{ base: "sm", md: "md", lg: "lg", xl: "820px" }}>
          {data.map((entry, index) => (
            <Box
              key={index}
              p={3}
              textTransform={"capitalize"}
              rounded={"md"}
              fontSize={"sm"}
              boxShadow={"base"}
            >
              <Box
                color={useColorModeValue("gray.500", "whiteAlpha.600")}
                fontFamily="Inter"
                fontWeight={"light"}
              >
                {entry.title}
              </Box>
              <Box color={useColorModeValue("gray.500", "whiteAlpha.600")} lineHeight={"6"}>
                {entry.details}
              </Box>
              <Flex>
                <Box></Box>
                <Box fontSize={"3xl"} color={useColorModeValue("orange.500", "orange.400")}>
                  {entry.amount}
                </Box>
              </Flex>
              <SelectNote note={entry.id} />
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  )
}
const Display = (props) => {
  let selectedDate = props.selectedDate
  if (selectedDate != undefined) {
    const fetcher = async (url, selectedDate) => {
      const response = await fetch(`${url}${selectedDate}`)
      const data = await response.json()
      if (data.msg == "Not Authenticated") {
        throw new Error("User Not authenticated")
      }
      return data
    }
    const { data, error } = useSWR(["api/diary/?type=display&selectedDate=", selectedDate], fetcher)
    if (error) {
      return <Box>{error.message}</Box>
    }
    if (!data) {
      return <Box> Loading </Box>
    }
    let totalExpense = data.reduce((total, item) => total + Number(item.amount), 0).toFixed(3)
    props.setTotalExpense(totalExpense)
    return <DisplayDiary data={data} diaryDate={selectedDate} />
  } else {
    return <Box>Undefined</Box>
  }
}
export default Display
