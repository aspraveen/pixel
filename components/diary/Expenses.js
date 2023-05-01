import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Tooltip,
} from "@chakra-ui/react"

import useSWR from "swr"
import NthNumber from "./NthNumber"
import Badges from "./Badges"
//replace html tags
const Description = ({ details }) => {
  details = details.replaceAll("<br/>", ".")
  let shortDetails = details.substr(0, 250)
  return (
    <Box>
      <Tooltip hasArrow label={details} bg={useColorModeValue("purple.600", "purple.100")}>
        {shortDetails}
      </Tooltip>
    </Box>
  )
}
const ExpenseDay = ({ date }) => {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = new Date(date).getDate()
  let dayName = days[new Date(date).getDay()]
  return (
    <Stack direction="row">
      <Badge variant="subtle" colorScheme="green">
        {day} <NthNumber number={day} />
      </Badge>
      <Badge variant="subtle" colorScheme="purple">
        {dayName}
      </Badge>
    </Stack>
  )
}
const TotalForMonth = ({ data }) => {
  let totalExpense = data.reduce((total, item) => total + Number(item.amount), 0).toFixed(3)
  return totalExpense
}
const Expenses = (props) => {
  let selectedDate = props.selectedDate
  if (selectedDate != undefined) {
    const fetcher = async (url) => {
      const response = await fetch(`${url}`)
      const data = await response.json()
      if (data.msg == "Not Authenticated") {
        throw new Error("User Not authenticated")
      }
      return data
    }
    const { data, error, isLoading } = useSWR(
      `api/diary/?type=expenses&selectedDate=${selectedDate}`,
      fetcher,
    )
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

    return (
      <>
        <TableContainer>
          <Table variant={"simple"} colorScheme="purple">
            <TableCaption>Expenses List</TableCaption>
            <Thead>
              <Tr>
                <Th>SL</Th>
                <Th>Day</Th>
                <Th>Description</Th>
                <Th>Amount</Th>
                <Th>Severity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((expense, sl) => (
                <Tr key={expense.id}>
                  <Td>{sl + 1}</Td>
                  <Td>
                    <ExpenseDay date={expense.transDate} />
                  </Td>
                  <Td>
                    <Description details={expense.title} />
                  </Td>
                  <Td>{expense.amount}</Td>
                  <Td>
                    <Box width={"14"}>
                      <Badges data={expense.amount} type={"impact"} />
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={3}></Th>
                <Th>
                  <TotalForMonth data={data} />
                </Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </>
    )
  } else {
    return <Box> No date selected</Box>
  }
}
export default Expenses
