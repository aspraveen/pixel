import {
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Tbody,
  TableCaption,
  Alert,
  AlertIcon,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import { DeleteIcon } from "@chakra-ui/icons"

const ListImages = forwardRef((props, ref) => {
  const [errorMessage, setErrorMessage] = useState()
  const [existingImages, setExistingImages] = useState([])
  const variant = useBreakpointValue({ base: "md", md: "lg" })

  useImperativeHandle(ref, () => ({
    refreshGrid() {
      getListOfImages()
    },
  }))
  const getListOfImages = async () => {
    const res = await fetch(`/api/manageit/manage-s3?action=getFiles`)
    setExistingImages(await res.json())
  }
  const deleteImage = async (e) => {
    const fileToDelete = e.currentTarget.getAttribute("toDeleteId")
    const res = await fetch(`/api/manageit/manage-s3?action=deleteFile&todeleteid=${fileToDelete}`)
    if (res.ok) {
      setExistingImages(await res.json())
    } else {
      setErrorMessage("Failed")
    }
  }
  useEffect(() => {
    getListOfImages()
  }, [])

  return (
    <>
      <Heading as="h4" size={variant} mt={10} pb={10}>
            Available Media
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Manage images on s3</TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>URL</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {existingImages.map((image, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    {image.name},{image.id}
                  </Td>
                  <Td>{image.uri}</Td>
                  <Td>
                    <a onClick={deleteImage} todeleteid={image.id}>
                      <DeleteIcon />
                    </a>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Alert status="error" visibility={errorMessage != null ? "visible" : "hidden"}>
        <AlertIcon />
        Failed to complete request
      </Alert>
    </>
  )
})
export default ListImages
