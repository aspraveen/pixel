import {
  Box,
  useColorModeValue,
  Stack,
  Skeleton,
  Divider,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react"
import ClearHTML from "./ClearHTML"
import useSWR from "swr"
import Badges from "./Badges"

//component to display data for the year
const yearFilter = (transYear) => {
  let dateVal = transYear.split("-")
  return dateVal[0]
}
const ShowDataForYear = ({ data, year }) => {
  data = data.filter((element) => yearFilter(element.transDate) == year)
  return (
    <SimpleGrid columns={[1, null, 5]} spacing={5}>
      {data.map((item, index) => (
        <Box
          fontSize={"md"}
          color={"gray.400"}
          backgroundColor={useColorModeValue("gray.50", "gray.600")}
          p={5}
          rounded={"md"}
          key={item.id}
        >
          <Heading
            as="h4"
            fontSize={["sm", null, "lg"]}
            fontFamily={"Inter"}
            textTransform={"capitalize"}
          >
            <ClearHTML details={item.title} />
          </Heading>
          <Box fontSize={["sm", null, "md"]}>
            <ClearHTML details={item.details} />
          </Box>
          <Divider my={5} />
          <SimpleGrid columns={[2, null, 3]} spacing={1}>
            <Badges data={item.amount} type={"impact"} />
            <Badges data={item.amount} type={"amount"} />
            <Badges data={item.people} type={"people"} />
            <Badges data={item.places} type={"places"} />
            <Badges data={item.tags} type={"tags"} />
          </SimpleGrid>
        </Box>
      ))}
    </SimpleGrid>
  )
}

const History = (props) => {
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
      `api/diary/?type=history&selectedDate=${selectedDate}`,
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
    //Find years in data
    let years = []
    for (let i = 0; i <= data.length; i++) {
      if (data[i] != undefined) {
        let dateval = data[i].transDate.split("-")
        years[i] = dateval[0]
      }
    }
    //remove duplicate years
    years = years.reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item]
    }, [])
    //sort years
    years.sort()
    return (
      <>
        <Box>
          {years.map((year) => (
            <Box color={"gray.300"} fontFamily={"montserrat"} fontSize={"3xl"} key={year}>
              <Box py={2}> {year} </Box>
              <ShowDataForYear data={data} year={year} />
              <Divider py={2} />
            </Box>
          ))}
        </Box>
      </>
    )
  } else {
    return <Box> No date selected</Box>
  }
}
export default History
