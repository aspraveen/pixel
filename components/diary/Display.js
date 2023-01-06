import {
  Box,
  VStack,
  Flex,
  useColorModeValue,
  Heading,
  IconButton,
  Stack,
  Skeleton,
} from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa"
import { useContext } from "react"
import useSWR from "swr"
import { NoteContext } from "../../pages/diary"

const SelectNote = ({ note }) => {
  const [noteToEdit, setNoteToEdit] = useContext(NoteContext)

  const handleClick = (note) => {
    setNoteToEdit(note)
  }

  return (
    <>
      <IconButton
        colorScheme="gray"
        aria-label="edit"
        size="xs"
        icon={<FaEdit color="#666666" />}
        onClick={() => handleClick(note)}
        variant={"outline"}
      ></IconButton>
    </>
  )
}
const DisplayDiary = (props) => {
  const data = props.data
  const diaryDate = new Date(props.diaryDate).toDateString()

  return (
    <Box>
      <VStack alignItems="flex-start">
        <Heading pl={2} color={"gray.500"} as="h4" size={"lg"}>
          {diaryDate}
        </Heading>
        <Box>
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
              <Box textAlign={"right"}>
                <SelectNote note={entry.id} />
              </Box>
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
      return (
        <Box>
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        </Box>
      )
    }
    let totalExpense = data.reduce((total, item) => total + Number(item.amount), 0).toFixed(3)
    props.setTotalExpense(totalExpense)
    return <DisplayDiary data={data} diaryDate={selectedDate} />
  } else {
    return <Box>Undefined</Box>
  }
}
export default Display
