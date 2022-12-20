import { Input, Box, Textarea, Button, useToast, Center } from "@chakra-ui/react"
import { useEffect, useState, useContext } from "react"
import { NoteContext } from "../../pages/diary"

const EditNote = (props) => {
  const [noteToEdit, setNoteToEdit] = useContext(NoteContext)
  const toast = useToast()
  const [inputField, setInputField] = useState({
    transDate: "",
    title: "",
    details: "",
    amount: null,
    tags: "",
    places: "",
    people: "",
    category: "",
    currency: "",
    paymentMethod: "",
    id: "",
  })
  const handleChangeInput = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value })
  }
  const handleDelete = async (e) => {
    const deletePayLoad = {
      id: props.note,
    }
    const url = "/api/diary"
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deletePayLoad),
    })
    const result = await response.json()
    if (response.status == "200") {
      toast({
        title: "Transaction Deleted",
        description: "We've removed the transaction",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setNoteToEdit(undefined) // to reset the call otherwise add notes showing edit of previously selected note.
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    const putPayLoad = {
      inputField,
    }
    //console.log(postPayLoad)
    const url = "/api/diary"
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putPayLoad),
    })
    const result = await response.json()
    //console.log("🚀 ~ file: index.js ~ line 49 ~ handleSubmit ~ result", result)
    if (response.status == "200") {
      toast({
        title: "Transactions Edited",
        description: "We've updated the transaction",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setNoteToEdit(undefined) // to reset the call otherwise add notes showing edit of previously selected note.
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
  //fetch from backend
  const note = props.note

  useEffect(() => {
    const fetchData = async () => {
      const details = await fetch(`/api/diary?type=edit&note=${note}`, {
        method: "GET",
      })
      const selectedNote = await details.json()
      console.log("🚀 ~ file: EditNote.js:19 ~ fetchData ~ selectedNote", selectedNote)
      setInputField({
        transDate: selectedNote.transDate,
        title: selectedNote.title,
        details: selectedNote.details,
        amount: selectedNote.amount,
        tags: selectedNote.tags,
        places: selectedNote.places,
        people: selectedNote.people,
        category: selectedNote.category,
        currency: selectedNote.currency,
        paymentMethod: selectedNote.paymentMethod,
        id: note,
      })
    }
    fetchData()
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box p={2} width={{ lg: "500px" }}>
          <input
            placeholder="dd/mm/yyyy"
            name="transDate"
            label="transDate"
            value={inputField.transDate}
            onChange={(e) => handleChangeInput(e)}
            my={1}
          ></input>
          <Input
            placeholder="Enter Title"
            name="title"
            label="title"
            value={inputField.title}
            onChange={(e) => handleChangeInput(e)}
            my={1}
          ></Input>
          <Textarea
            placeholder="Details"
            name="details"
            label="details"
            value={inputField.details}
            onChange={(e) => handleChangeInput(e)}
            my={1}
          ></Textarea>
          <Input
            step={"0.001"}
            value={inputField.amount}
            placeholder="0.000"
            type={"number"}
            name="amount"
            label="amount"
            onChange={(e) => handleChangeInput(e)}
            my={1}
            color="orange.300"
            borderColor={"orange.300"}
          ></Input>
          <select
            name="currency"
            label="currency"
            onChange={(e) => handleChangeInput(e)}
            my={1}
            color="orange.300"
            value={inputField.currency}
          >
            <option>BHD</option>
            <option>INR</option>
            <option>USD</option>
          </select>
          <select
            name="paymentMethod"
            label="payment Method"
            onChange={(e) => handleChangeInput(e)}
            my={1}
            color="orange.300"
            value={inputField.paymentMethod}
          >
            <option>Benefit</option>
            <option>City Bank</option>
            <option>CrediMax Danat</option>
            <option>CrediMax Prepaid</option>
            <option>Federal</option>
            <option>ICICI</option>
            <option>Cash</option>
            <option>STC Pay</option>
            <option>Beyon</option>
            <option>ILA Card</option>
          </select>
          <Input
            value={inputField.tags}
            name="tags"
            label="tags"
            placeholder="tags"
            onChange={(e) => handleChangeInput(e)}
            my={1}
          ></Input>
          <Input
            value={inputField.places}
            name="places"
            label="places"
            placeholder="places"
            onChange={(e) => handleChangeInput(e)}
            my={1}
          ></Input>
          <Input
            value={inputField.people}
            name="people"
            label="people"
            placeholder="people"
            onChange={(e) => handleChangeInput(e)}
            my={1}
          ></Input>
          <Button type="submit">Save</Button>
        </Box>
      </form>
      <Box py={10} border={"1px"} borderColor="red.100">
        <Center>
          <Button colorScheme={"red"} size="sm" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Center>
      </Box>
    </>
  )
}
export default EditNote
