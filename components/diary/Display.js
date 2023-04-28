import {
  Box,
  VStack,
  SimpleGrid,
  useColorModeValue,
  IconButton,
  Stack,
  Skeleton,
  Divider,
  Center,
} from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa"
import { RepeatIcon } from "@chakra-ui/icons"
import { forwardRef, memo, useContext, useImperativeHandle } from "react"
import useSWR from "swr"
import { NoteContext } from "../../pages/diary"
import ClearHTML from "./ClearHTML"
import Badges from "./Badges"
import TotalExpense from "./TotalExpense"
import DiaryDate from "./DiaryDate"
import Image from "next/image"
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
          <Box p={2} width={"100%"}>
            <Center>
              <Box padding="6" boxShadow="sm" color={"gray.500"}>
                <Image src={"/nodata.svg"} height={300} width={400} alt={"nodata"}></Image>
                <Box
                  fontSize={["sm", null, "xl"]}
                  color={useColorModeValue("gray.300", "gray.500")}
                  mt={2}
                >
                  Nothing added for this date
                </Box>
              </Box>
            </Center>
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
            {data.map((entry, index) => (
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
                  <Badges data={entry.amount} type={"impact"} />
                  <Badges data={entry.amount} type={"amount"} />
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
        </VStack>
      </Box>
    )
  }
}
const fetcher = async (url) => {
  const response = await fetch(`${url}`)
  const data = await response.json()
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
    return <Box>{error.message}</Box>
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
    let totalExpense = data.reduce((total, item) => total + Number(item.amount), 0).toFixed(3)
    return (
      <>
        <DisplayDiary data={data} diaryDate={selectedDate} />
        {totalExpense > 0 && <TotalExpense totalExpense={totalExpense} />}

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
