import { Input, Box, Textarea, Button, useToast, Center, IconButton } from "@chakra-ui/react"
import { useEffect, useState, useContext } from "react"
import { NoteContext } from "../../pages/diary"
import { DeleteIcon } from "@chakra-ui/icons"

const ConfirmationBox = ({ note, closeModal }) => {
  const toast = useToast()
  const handleDelete = async (e) => {
    const url = `/api/diary/?id=${note}`
    const response = await fetch(url, {
      method: "DELETE",
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
      closeModal("edit")
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
  return (
    <Box bgColor={"pink.50"} rounded={"lg"} color={"pink.500"} py={10} px={5}>
      Confirm Deletion of this note.{" "}
      <Button colorScheme="pink" onClick={handleDelete}>
        I'm Sure
      </Button>
    </Box>
  )
}

const EditNote = (props) => {
  const [noteToEdit, setNoteToEdit] = useContext(NoteContext)
  const toast = useToast()
  const [confirmDelete, setConfirmDelete] = useState(false)
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
  const confirmDeletion = () => {
    setConfirmDelete(true)
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
      props.closeModal("edit")
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
            value={inputField.amount == null ? "" : inputField.amount}
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
          <Button type="submit">Save</Button>{" "}
          <IconButton onClick={confirmDeletion} icon={<DeleteIcon />} />
        </Box>
      </form>
      {confirmDelete && <ConfirmationBox note={props.note} closeModal={props.closeModal} />}
    </>
  )
}
export default EditNote
