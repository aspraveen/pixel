import { Box, Flex, Select, Wrap } from "@chakra-ui/react"
import { useState } from "react"

const Days = (props) => {
  const handleClick = (e) => {
    props.onChange(e.target.getAttribute("data-day"))
  }

  const days = []
  for (let i = 1; i <= 31; i++) {
    days.push(
      <Box
        fontSize={"xx-small"}
        backgroundColor="gray.600"
        p={1}
        w={5}
        alignItems={"center"}
        color={"gray.100"}
        onClick={(e) => handleClick(e)}
        data-day={i}
        key={i}
        _hover={{ backgroundColor: "orange.600", cursor: "pointer" }}
      >
        {i}
      </Box>,
    )
  }
  return <Wrap>{days}</Wrap>
}

const Months = (props) => {
  const handleOnChange = (month) => {
    console.log("🚀 ~ file: Calendar.js:33 ~ handleOnChange ~ month", month)
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
      borderColor={"gray.600"}
      onChange={(e) => handleOnChange(e.target.selectedIndex)}
    >
      {monthValues.map((value, key) => (
        <option name={key}>{value}</option>
      ))}
    </Select>
  )
}
const Years = (props) => {
  const handleChange = (SelectedYear) => {
    props.onChange(SelectedYear)
  }

  const currentYear = parseInt(new Date().getFullYear())

  const years = []

  for (let i = 2000; i <= currentYear; i++) {
    years.push(<option value={i}>{i}</option>)
  }
  return (
    <Select
      name="year"
      id="year"
      size={"xs"}
      color={"gray.300"}
      py={2}
      borderColor={"gray.600"}
      onChange={(e) => handleChange(e.target.value)}
    >
      {years}
    </Select>
  )
}

const Calendar = (props) => {
  const [selectedYear, setSelectedYear] = useState()
  const [selectedMonth, setSelectedMonth] = useState()
  const [selectedDay, setSelectedDay] = useState()
  const [selectedDate, setSelectedDate] = useState()
  console.log("🚀 ~ file: Calendar.js:99 ~ Calendar ~ selectedDate", selectedDate)

  const handleYearChange = (year) => {
    setSelectedYear(year)
    props.onChange(selectedDate)
  }
  const handleMonthChange = (month) => {
    setSelectedMonth(String(month).padStart(2, "0"))
    props.onChange(selectedDate)
  }
  const handleDayChange = (day) => {
    setSelectedDay(String(day).padStart(2, "0"))
    setSelectedDate(`${selectedYear}-${selectedMonth}-${selectedDay}`)
    props.onChange(selectedDate)
  }

  return (
    <Box
      width={"220px"}
      height={"220px"}
      boxShadow={"base"}
      borderColor={"gray.600"}
      borderWidth={"1px"}
      p={2}
      pl={4}
    >
      <Flex py={2} gap={1}>
        <Years onChange={handleYearChange} />
        <Months onChange={handleMonthChange} />
      </Flex>
      <Days onChange={handleDayChange} />
    </Box>
  )
}
export default Calendar
