import { Box, Flex, Select, useColorModeValue, Grid, GridItem } from "@chakra-ui/react"
import { useState, useEffect } from "react"

const Days = (props) => {
  const handleClick = (e) => {
    props.onChange(e.target.getAttribute("data-day"))
  }
  const days = []
  const startOfMonth = new Date(props.year, props.month - 1).getDay()
  //const numOfDays = 32 - new Date(props.year, props.month - 1, 32).getDate() //for eg if feb 2019, 32nd day will be 4th mar - so 32-4=28
  const numOfDays = new Date(props.year, props.month, 0).getDate()
  for (let j = 1; j <= startOfMonth; j++) {
    days.push(
      <GridItem
        fontSize={"xx-small"}
        p={1}
        w={5}
        alignItems={"center"}
        color={useColorModeValue("gray.600", "gray.100")}
        onClick={(e) => handleClick(e)}
        key={"j" + j}
        _hover={{ backgroundColor: "orange.600", cursor: "pointer" }}
      >
        &nbsp;
      </GridItem>,
    )
  }
  for (let i = 1; i <= numOfDays; i++) {
    days.push(
      <GridItem
        fontSize={"xx-small"}
        p={1}
        w={5}
        alignItems={"center"}
        color={useColorModeValue("gray.600", "gray.100")}
        onClick={(e) => handleClick(e)}
        data-day={i}
        key={"i" + i}
        _hover={{ backgroundColor: "orange.600", cursor: "pointer" }}
        backgroundColor={
          i == props.default ? "orange.400" : useColorModeValue("gray.300", "gray.600")
        }
      >
        {i}
      </GridItem>,
    )
  }
  return (
    <Grid templateColumns="repeat(7,1fr)" gap={1}>
      <GridItem fontSize={"xx-small"}>Sun</GridItem>
      <GridItem fontSize={"xx-small"}>Mon</GridItem>
      <GridItem fontSize={"xx-small"}>Tue</GridItem>
      <GridItem fontSize={"xx-small"}>Wed</GridItem>
      <GridItem fontSize={"xx-small"}>Thu</GridItem>
      <GridItem fontSize={"xx-small"} color={"orange.400"}>
        Fri
      </GridItem>
      <GridItem fontSize={"xx-small"} color={"orange.400"}>
        Sat
      </GridItem>
      {days}
    </Grid>
  )
}

const Months = (props) => {
  const handleOnChange = (month) => {
    props.onChange(parseInt(month) + 1)
  }
  const monthValues = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  return (
    <Select
      name="month"
      id="month"
      size={"xs"}
      color={"gray.300"}
      py={2}
      borderColor={useColorModeValue("gray.300", "gray.600")}
      onChange={(e) => handleOnChange(e.target.selectedIndex)}
    >
      {monthValues.map((value, key) =>
        key + 1 == props.default ? (
          <option name={key} selected key={value}>
            {value}
          </option>
        ) : (
          <option name={key} key={value}>
            {value}
          </option>
        ),
      )}
    </Select>
  )
}
const Years = (props) => {
  const handleChange = (SelectedYear) => {
    props.onChange(SelectedYear)
  }

  const currentYear = parseInt(new Date().getFullYear())

  const years = []

  for (let i = 2000; i <= currentYear + 1; i++) {
    years.push(
      i == props.default ? (
        <option value={i} selected key={i}>
          {i}
        </option>
      ) : (
        <option value={i} key={i}>
          {i}
        </option>
      ),
    )
  }
  return (
    <Select
      name="year"
      id="year"
      size={"xs"}
      color={"gray.300"}
      py={2}
      borderColor={useColorModeValue("gray.300", "gray.600")}
      onChange={(e) => handleChange(e.target.value)}
    >
      {years}
    </Select>
  )
}

const Calendar = (props) => {
  const dateString = new Date()
  const [selectedYear, setSelectedYear] = useState()
  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedDay, setSelectedDay] = useState()
  const [selectedDate, setSelectedDate] = useState()

  useEffect(() => {
    setSelectedDate(`${selectedYear}-${selectedMonth}-${selectedDay}`)
    //console.log("🚀 ~ file: Calendar.js:115 ~ Calendar ~ selectedDate", selectedDate)
  }, [selectedYear, selectedMonth, selectedDay])

  useEffect(() => {
    props.onClick(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    setSelectedDate(dateString.toISOString().slice(0, 10))
    setSelectedYear(dateString.getFullYear())
    setSelectedMonth(String(dateString.getMonth() + 1).padStart(2, "0"))
    setSelectedDay(String(dateString.getDate()).padStart(2, "0"))
  }, []) //initial render only

  const handleYearChange = (year) => {
    setSelectedYear(year)
  }
  const handleMonthChange = (month) => {
    setSelectedMonth(String(month).padStart(2, "0"))
  }
  const handleDayChange = (day) => {
    //console.log("🚀 ~ file: Calendar.js:130 ~ handleDayChange ~ day", day)
    setSelectedDay(String(day).padStart(2, "0"))
  }

  return (
    <Box
      width={"220px"}
      height={"240px"}
      boxShadow={"base"}
      borderColor={useColorModeValue("gray.300", "gray.600")}
      borderWidth={"1px"}
      p={2}
      pl={4}
      ml={{ base: "40px", md: 0 }}
    >
      <Flex py={2} gap={1}>
        <Years onChange={handleYearChange} default={selectedYear} />
        <Months onChange={handleMonthChange} default={selectedMonth} />
      </Flex>
      <Days
        onChange={handleDayChange}
        default={selectedDay}
        year={selectedYear}
        month={selectedMonth}
      />
    </Box>
  )
}
export default Calendar
