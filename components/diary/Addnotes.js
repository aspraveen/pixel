import {
  Input,
  Box,
  Textarea,
  Select,
  Wrap,
  WrapItem,
  IconButton,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react"

import { useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

const Addnotes = (props) => {
  const [transDate, setTransDate] = useState(props.selectedDate)
  const [inputFields, setInputFields] = useState([
    {
      title: "",
      details: "",
      amount: null,
      tags: "",
      places: "",
      people: "",
      category: "",
      currency: "",
      paymentMethod: "",
    },
  ])
  const toast = useToast()
  const handleChangeInput = (index, e) => {
    const values = [...inputFields]
    values[index][e.target.name] = e.target.value
    setInputFields(values)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postPayLoad = {
      transDate,
      inputFields,
    }
    //console.log(postPayLoad)
    const url = "/api/diary"
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postPayLoad),
    })
    const result = await response.json()
    //console.log("🚀 ~ file: index.js ~ line 49 ~ handleSubmit ~ result", result)
    if (response.status == "200") {
      toast({
        title: "Transactions Added",
        description: "We've created the transactions",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: "Sorry",
        description: result.msg,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleAddBox = (props) => {
    setInputFields([
      ...inputFields,
      {
        title: "",
        details: "",
        amount: null,
        tags: "",
        places: "",
        people: "",
        category: "",
        currency: "",
        paymentMethod: "",
      },
    ])
  }

  const handleRemoveBox = (index) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  const diaryDate = new Date(transDate).toDateString()

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Flex gap={5} alignItems="center">
          <Box>{diaryDate}</Box>
          <IconButton icon={<FaPlus />} onClick={handleAddBox}></IconButton>
        </Flex>
        <Wrap spacing={5}>
          {inputFields.map((inputField, index) => (
            <WrapItem>
              <Box key={index} p={2} width={{ lg: "400px" }}>
                <Input
                  placeholder="Enter Title"
                  name="title"
                  label="title"
                  value={inputField.title}
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                ></Input>
                <Textarea
                  placeholder="Details"
                  name="details"
                  label="details"
                  value={inputField.details}
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                ></Textarea>
                <Input
                  step={"0.001"}
                  placeholder="0.000"
                  type={"number"}
                  name="amount"
                  label="amount"
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                  color="orange.300"
                  borderColor={"orange.300"}
                ></Input>
                <Select
                  name="currency"
                  label="currency"
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                  color="orange.300"
                >
                  <option>BHD</option>
                  <option>INR</option>
                  <option>USD</option>
                </Select>
                <Select
                  name="paymentMethod"
                  label="payment Method"
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                  color="orange.300"
                >
                  <option>Benefit</option>
                  <option>City Bank</option>
                  <option>CrediMax Danat</option>
                  <option>CrediMax Prepaid</option>
                  <option>Federal</option>
                  <option>ICICI</option>
                </Select>
                <Input
                  name="tags"
                  label="tags"
                  placeholder="tags"
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                ></Input>
                <Input
                  name="places"
                  label="places"
                  placeholder="places"
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                ></Input>
                <Input
                  name="people"
                  label="people"
                  placeholder="people"
                  onChange={(e) => handleChangeInput(index, e)}
                  my={1}
                ></Input>
                <IconButton
                  colorScheme={"red"}
                  size={"xs"}
                  icon={<FaMinus />}
                  my={2}
                  onClick={() => handleRemoveBox(index)}
                ></IconButton>
              </Box>
            </WrapItem>
          ))}
        </Wrap>
        <Button type="submit">Save</Button>
      </form>
    </Box>
  )
}
export default Addnotes