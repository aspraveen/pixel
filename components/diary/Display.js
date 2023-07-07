import {
  Box,
  VStack,
  SimpleGrid,
  useColorModeValue,
  IconButton,
  Stack,
  Skeleton,
  Divider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tooltip,
} from "@chakra-ui/react"
import { FaEdit, FaSmileBeam } from "react-icons/fa"
import { RepeatIcon } from "@chakra-ui/icons"
import { forwardRef, memo, useContext, useImperativeHandle } from "react"
import useSWR from "swr"
import { NoteContext } from "../../pages/diary"
import ClearHTML from "./ClearHTML"
import Badges from "./Badges"
import DiaryDate from "./DiaryDate"
const Description = ({ title, details }) => {
  title = title.replaceAll("<br/>", ".")
  details = details.replaceAll("<br/>", ".")
  let shortDetails = title.substr(0, 25)
  return (
    <Box>
      <Tooltip hasArrow label={details} bg={useColorModeValue("purple.600", "purple.100")}>
        {shortDetails}
      </Tooltip>
    </Box>
  )
}
const TotalForMonth = ({ data }) => {
  let totalExpense = data.reduce((total, item) => total + Number(item.amount), 0).toFixed(3)
  return totalExpense
}
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
  const notes = data.filter((note) => note.amount === null)
  const expenses = data.filter((note) => note.amount != null)

  if (Object.keys(data).length == 0) {
    return (
      <Box>
        <VStack alignItems="flex-start" width={"100%"} gap={10}>
          <Box
            p={2}
            color={"gray.500"}
            rounded={"md"}
            fontSize={["lg", null, "xl"]}
            borderBottom={"4px"}
            borderColor={useColorModeValue("gray.200", "gray.600")}
          >
            <DiaryDate date={props.diaryDate} page={"display"} />
          </Box>
          <Box width={"100%"}>
            <Box padding="3" boxShadow="sm" color={"gray.500"}>
              <Box color={useColorModeValue("gray.300", "gray.500")}>
                <Flex alignItems={"center"}>
                  <FaSmileBeam size={50} />
                  <Box fontSize={["sm", null, "xl"]} ml={2}>
                    it's empty!
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </VStack>
      </Box>
    )
  } else {
    return (
      <Box>
        <VStack alignItems="flex-start" width={"100%"}>
          <Box
            p={2}
            color={"gray.500"}
            rounded={"md"}
            fontSize={["lg", null, "xl"]}
            borderBottom={"4px"}
            borderColor={useColorModeValue("gray.200", "gray.600")}
          >
            <DiaryDate date={props.diaryDate} page={"display"} />
          </Box>
          <Box>
            {notes.map((entry) => (
              <Box
                key={entry.id}
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
                  <ClearHTML details={entry.title} />
                </Box>
                <Box color={useColorModeValue("gray.500", "whiteAlpha.600")} lineHeight={"6"}>
                  <ClearHTML details={entry.details} />
                </Box>
                <Divider my={5} />
                <SimpleGrid columns={[3, null, 5]} spacing={1}>
                  <Badges data={entry.people} type={"people"} />
                  <Badges data={entry.places} type={"places"} />
                  <Badges data={entry.tags} type={"tags"} />
                </SimpleGrid>
                <Box textAlign={"right"}>
                  <SelectNote note={entry.id} />
                </Box>
              </Box>
            ))}
          </Box>
          <Divider py={5} />
          <TableContainer width={"100%"}>
            <Table variant={"simple"} colorScheme="purple">
              <TableCaption>Expenses List</TableCaption>
              <Thead>
                <Tr>
                  <Th>SL</Th>
                  <Th>Edit</Th>
                  <Th>Title</Th>
                  <Th>Severity</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {expenses.map((expense, sl) => (
                  <Tr key={expense.id}>
                    <Td>{sl + 1}</Td>
                    <Td>
                      <SelectNote note={expense.id} />
                    </Td>
                    <Td>
                      <Description title={expense.title} details={expense.details} />
                    </Td>
                    <Td>
                      <Box>
                        <Badges data={expense.amount} type={"impact"} />
                      </Box>
                    </Td>
                    <Td>{expense.amount}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th colSpan={4}></Th>
                  <Th>
                    <Box fontSize={"lg"} color={"purple.400"}>
                      <TotalForMonth data={data} />
                    </Box>
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      </Box>
    )
  }
}
const fetcher = async (url) => {
  const response = await fetch(`${url}`)
  const data = await response.json()

  if (response.status === 400) {
    throw new Error(data.msg) // Throw the error
  }
  if (data.msg == "Not Authenticated") {
    throw new Error("User Not authenticated")
  }
  return data
}
const Display = forwardRef((props, ref) => {
  let selectedDate = props.selectedDate == undefined ? "2020-01-01" : props.selectedDate //just to avoid error
  const { data, error, isLoading, mutate } = useSWR(
    `api/diary/?type=display&selectedDate=${selectedDate}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      errorRetryCount: 2,
    },
  )
  useImperativeHandle(ref, () => ({
    mutateDataOnClose() {
      mutate()
    },
  }))
  const mutateData = () => {
    mutate()
  }

  if (error) {
    return (
      <Box
        fontSize={"sm"}
        color={"gray.300"}
        p={5}
        borderWidth={1}
        borderColor={"gray.200"}
        rounded={"md"}
      >
        {error.message}
      </Box>
    )
  }
  if (isLoading) {
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
  if (data) {
    return (
      <>
        <DisplayDiary data={data} diaryDate={selectedDate} />

        <Box textAlign={"right"} mt={5}>
          <IconButton
            variant="outline"
            colorScheme="gray"
            aria-label="Send email"
            icon={<RepeatIcon />}
            onClick={mutateData}
          />
        </Box>
      </>
    )
  }
})
export default memo(Display)
