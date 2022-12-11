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
  Modal,
} from "@chakra-ui/react"

const EditNote = async (props) => {
  console.log("🚀 ~ file: EditNote.js:16 ~ EditNote ~ props", props)
  //fetch from backend
  const note = props.note
  const details = await fetch(`/api/diary?type=edit&note=${note}`, {
    method: "GET",
  })
  const selectedNote = await details.json()
  console.log("🚀 ~ file: EditNote.js:23 ~ EditNote ~ selectedNote", selectedNote)
  return <Box>edit</Box>
}
export default EditNote
